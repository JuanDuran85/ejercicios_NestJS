import { SharedModule } from './../../shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]), SharedModule],
  providers: [UserService],
})
export class UserModule {}
