import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserEntity } from './model/user.entity';

@Module({
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: 'claveSecreta',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService],
})
export class AuthModule {}
