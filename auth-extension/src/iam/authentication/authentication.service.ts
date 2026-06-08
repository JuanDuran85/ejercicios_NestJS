import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../users';
import { HashingService } from '../hashing';
import { SignInDto, SignUpDto } from './dto';

@Injectable()
export class AuthenticationService {
  private readonly ERROR_USER_SIGN_IN = 'User not found or Invalid Password';
  private readonly logger: Logger = new Logger(AuthenticationService.name);
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly hashingService: HashingService,
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

  public async signIn(signInDto: SignInDto): Promise<Partial<User>> {
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

    return {
      email: userFound.email,
      id: userFound.id,
    };
  }
}
