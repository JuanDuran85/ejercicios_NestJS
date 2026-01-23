import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [],
})
export class UsersModule { }
