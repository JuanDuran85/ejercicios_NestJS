import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '../common';
import jwtConfig from '../config/jwt.config';
import { User } from '../users';
import {
  AuthenticationController,
  AuthenticationService,
} from './authentication';
import { BcryptjsService, HashingService } from './hashing';

@Module({
  providers: [
    {
      provide: HashingService,
      useClass: BcryptjsService,
    },
    AuthenticationService,
  ],
  imports: [
    CommonModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
  ],
  exports: [],
  controllers: [AuthenticationController],
})
export class IamModule {}
