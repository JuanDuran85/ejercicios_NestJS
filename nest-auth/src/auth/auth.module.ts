import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserEntity } from './model/user.entity';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [AuthService],
})
export class AuthModule {}
