import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../users';
import { HashingService } from '../hashing';
import { SignInDto, SignUpDto } from './dto';

@Injectable()
export class AuthenticationService {
  private readonly ERROR_USER_SIGN_IN = 'User not found or Invalid Password';
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly hashingService: HashingService,
  ) {}

  public async signUp(signUpDto: SignUpDto): Promise<User> {
    const { email, password } = signUpDto;
    try {
      const newUser: User = new User();
      newUser.email = email;
      newUser.password = this.hashingService.hash(password);
      await this.userRepository.save(newUser);
      return newUser;
    } catch (error) {
      console.debug(error);
      throw error;
    }
  }

  public async signIn(signInDto: SignInDto): Promise<User> {
    const userFound: User | null = await this.userRepository.findOne({
      where: {
        email: signInDto.email,
      },
    });

    console.debug({userFound});
    if (!userFound) throw new UnauthorizedException(this.ERROR_USER_SIGN_IN);

    const isEqual: boolean = this.hashingService.compare(
      signInDto.password,
      userFound.password,
    );
    if (!isEqual) throw new UnauthorizedException(this.ERROR_USER_SIGN_IN);

    return userFound;
  }
}
