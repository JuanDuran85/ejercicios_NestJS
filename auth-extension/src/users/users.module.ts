import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiKey } from './api-key/entities/api-key.entity';
import { User } from './entities';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, ApiKey])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [],
})
export class UsersModule {}
