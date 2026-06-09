import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '../common';
import jwtConfig from '../config/jwt.config';
import { User } from '../users';
import {
  AuthenticationController,
  AuthenticationGuard,
  AuthenticationService,
} from './authentication';
import { AccessTokenGuard } from './authentication/guards/access-token/access-token.guard';
import { PermissionGuard } from './authorization/guards/permissions.guard';
import { BcryptjsService, HashingService } from './hashing';

@Module({
  providers: [
    {
      provide: HashingService,
      useClass: BcryptjsService,
    },
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionGuard, //RolesGuard,
    },
    AccessTokenGuard,
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
