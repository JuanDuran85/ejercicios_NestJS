import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as session from 'express-session';
import * as passport from 'passport';
import { CommonModule } from '../common';
import { envs } from '../config';
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
import { OtpAuthenticationService } from './authentication/otp-authentication.service';
import { UserSerializer } from './authentication/serializers/user-serializer';
import { SessionAuthenticationController } from './authentication/session-authentication.controller';
import { SessionAuthenticationService } from './authentication/session-authentication.service';
import { GoogleAuthenticationController } from './authentication/social/google-authentication.controller';
import { GoogleAuthenticationService } from './authentication/social/google-authentication.service';
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
    GoogleAuthenticationService,
    OtpAuthenticationService,
    SessionAuthenticationService,
    UserSerializer,
  ],
  imports: [
    CommonModule,
    TypeOrmModule.forFeature([User, ApiKey]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
  ],
  exports: [],
  controllers: [
    AuthenticationController,
    GoogleAuthenticationController,
    SessionAuthenticationController,
  ],
})
export class IamModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session.default({
          secret: envs.sessionSecret,
          resave: false,
          saveUninitialized: false,
          cookie: {
            sameSite: true,
            httpOnly: true,
          },
        }),
        passport.initialize(),
        passport.session(),
      )
      .forRoutes('*');
  }
}
