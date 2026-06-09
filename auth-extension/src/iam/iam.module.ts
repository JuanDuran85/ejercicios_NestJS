import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '../common';
import jwtConfig from '../config/jwt.config';
import { User } from '../users';
import { ApiKey } from '../users/api-key/entities/api-key.entity';
import {
  AuthenticationController,
  AuthenticationGuard,
  AuthenticationService,
} from './authentication';
import { ApiKeyService } from './authentication/api-key/api-key.service';
import { AccessTokenGuard } from './authentication/guards/access-token/access-token.guard';
import { ApiKeyGuard } from './authentication/guards/api-key/api-key.guard';
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
    ApiKeyService,
    ApiKeyGuard,
  ],
  imports: [
    CommonModule,
    TypeOrmModule.forFeature([User, ApiKey]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
  ],
  exports: [],
  controllers: [AuthenticationController],
})
export class IamModule {}
