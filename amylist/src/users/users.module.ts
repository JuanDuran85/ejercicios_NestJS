import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsModule } from 'src/items/items.module';
import { CommonModule } from '../common/common.module';
import { User } from './entities/user.entity';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  providers: [UsersResolver, UsersService],
  exports: [TypeOrmModule, UsersService],
  imports: [TypeOrmModule.forFeature([User]), CommonModule, ItemsModule],
  controllers: [],
})
export class UsersModule {}
