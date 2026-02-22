import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignupInput } from '../auth/dto';
import { ValidRoles } from '../auth/enum';
import { BcryptJsAdapter } from '../common/adapters';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly logger: Logger = new Logger('UsersService');

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly bcryptJsAdapter: BcryptJsAdapter,
  ) {}

  public async create(signupInput: SignupInput): Promise<User> {
    try {
      const newUser: User = this.userRepository.create({
        ...signupInput,
        password: this.bcryptJsAdapter.hash(signupInput.password),
      });
      return await this.userRepository.save(newUser);
    } catch (error) {
      this.handleDbErrors(error);
    }
  }

  public async findAll(roles: ValidRoles[]): Promise<User[]> {
    if (roles.length === 0) return this.userRepository.find();
    console.debug({ roles });
    return this.userRepository
      .createQueryBuilder()
      .andWhere('ARRAY[roles] && ARRAY[:...roles]')
      .setParameter('roles', roles)
      .getMany();
  }

  public async findOne(id: string): Promise<User> {
    return {} as User;
  }

  public async findOneByEmail(email: string): Promise<User> {
    try {
      return await this.userRepository.findOneByOrFail({ email });
    } catch (error) {
      this.logger.error(String(error));
      this.handleDbErrors({
        code: 'error-001',
        detail: `User with email ${email} not found`,
      });
    }
  }

  public async block(id: string): Promise<User> {
    const userToBlock: User = await this.findOneById(id);
    userToBlock.isBlocked = true;
    return await this.userRepository.save(userToBlock);
  }

  public async unblock(id: string): Promise<User> {
    const userToUnblock: User = await this.findOneById(id);
    userToUnblock.isBlocked = false;
    return await this.userRepository.save(userToUnblock);
  }

  public async findOneById(id: string): Promise<User> {
    try {
      return await this.userRepository.findOneByOrFail({ id });
    } catch (error) {
      this.logger.error(String(error));
      this.handleDbErrors({
        code: 'error-001',
        detail: `User with id ${id} not found`,
      });
    }
  }

  private handleDbErrors(error: any): never {
    if (error.code === '23505') {
      this.logger.error(error.detail);
      throw new BadRequestException(error.detail);
    }

    if (error.code === 'error-001') {
      throw new BadRequestException(error.detail);
    }

    this.logger.fatal(String(error));
    throw new InternalServerErrorException(
      'Something went wrong. Please check server logs',
    );
  }
}
