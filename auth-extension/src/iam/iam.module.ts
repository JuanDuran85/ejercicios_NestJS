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
import { PoliciesGuard } from './authorization/guards/policy.guard';
import { FrameworkContributorPolicyHandler } from './authorization/policies/frameworkcontributor-handler.policy';
import { PolicyHandlerStorage } from './authorization/policies/policy-handlers.storage';
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
      useClass: PoliciesGuard, //RolesGuard,
    },
    AccessTokenGuard,
    AuthenticationService,
    PolicyHandlerStorage,
    FrameworkContributorPolicyHandler,
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
