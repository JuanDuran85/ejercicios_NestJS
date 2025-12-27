import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BcryptJsAdapter } from '../common/adapters/bcryptjs.adapter';
import { CreateUserDto, LoginUserDto } from './dto';
import { User } from './entities/user.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly encryptAdapter: BcryptJsAdapter,
    private readonly jwtService: JwtService,
  ) {}
  public async create(createUserDto: CreateUserDto): Promise<unknown> {
    try {
      const { password, ...userData } = createUserDto;
      const user: User = this.userRepository.create({
        ...userData,
        password: this.encryptAdapter.hash(password),
      });
      await this.userRepository.save(user);
      return { ...user, token: this.getJwtToken({ id: user.id }) };
    } catch (error) {
      this.handlerDbError(error);
    }
  }

  public async login(loginUserDto: LoginUserDto): Promise<unknown> {
    const { email, password } = loginUserDto;
    const user: User | null = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true },
    });

    if (!user || !this.encryptAdapter.check(password, user.password))
      throw new UnauthorizedException('Credentials are not valid');

    return { ...user, token: this.getJwtToken({ id: user.id }) };
  }

  private getJwtToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload);
  }

  private handlerDbError(error: unknown): never {
    //@ts-ignore
    if (error!.code === '23505') throw new BadRequestException(error.detail);

    console.error(String(error));

    throw new InternalServerErrorException(
      ' Unexpected error, check server logs',
    );
  }
}
