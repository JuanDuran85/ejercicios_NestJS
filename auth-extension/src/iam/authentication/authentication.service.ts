import {
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import jwtConfig from '../../config/jwt.config';
import { User } from '../../users';
import { HashingService } from '../hashing';
import { ActiveUserData, TokenResponse } from '../interfaces';
import { RefreshTokenDto, SignInDto, SignUpDto } from './dto';

@Injectable()
export class AuthenticationService {
  private readonly ERROR_USER_SIGN_IN = 'User not found or Invalid Password';
  private readonly logger: Logger = new Logger(AuthenticationService.name);
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly hashingService: HashingService,
    private readonly jwrService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  public async signUp(signUpDto: SignUpDto): Promise<Partial<User>> {
    const { email, password } = signUpDto;
    try {
      const newUser: User = new User();
      newUser.email = email;
      newUser.password = this.hashingService.hash(password);
      await this.userRepository.save(newUser);
      return {
        email: newUser.email,
        id: newUser.id,
      };
    } catch (error) {
      this.logger.error('Error Creating User');
      throw error;
    }
  }

  public async signIn(signInDto: SignInDto): Promise<TokenResponse> {
    const userFound: User | null = await this.userRepository.findOne({
      where: {
        email: signInDto.email,
      },
    });

    if (!userFound) throw new UnauthorizedException(this.ERROR_USER_SIGN_IN);

    const isEqual: boolean = this.hashingService.compare(
      signInDto.password,
      userFound.password,
    );
    if (!isEqual) throw new UnauthorizedException(this.ERROR_USER_SIGN_IN);

    return await this.generateTokens(userFound);
  }

  public async generateTokens(userFound: User): Promise<TokenResponse> {
    const [accessToken, refreshToken] = await Promise.all([
      this.signToken<Partial<ActiveUserData>>(
        userFound.id,
        this.jwtConfiguration.accessTokenTtl,
      ),
      this.signToken(userFound.id, this.jwtConfiguration.refreshTokenTtl),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  public async refreshToken(
    refreshTokenDto: RefreshTokenDto,
  ): Promise<TokenResponse> {
    try {
      const { sub } = await this.jwrService.verifyAsync<
        Pick<ActiveUserData, 'sub'>
      >(refreshTokenDto.refreshToken, {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
      });

      const userFound: User = await this.userRepository.findOneByOrFail({
        id: Number(sub),
      });

      return this.generateTokens(userFound);
    } catch (error) {
      const finalError = error as Error;
      this.logger.error(`Error Refreshing Token - ${finalError.message}`);
      throw new UnauthorizedException();
    }
  }

  private async signToken<T>(
    userId: number,
    expiresIn: number,
    payload?: T,
  ): Promise<string> {
    return await this.jwrService.signAsync(
      {
        sub: userId,
        ...payload,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.accessTokenTtl,
      },
    );
  }
}
