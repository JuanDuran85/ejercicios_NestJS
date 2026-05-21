import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BcryptJsAdapter } from '../common';
import { NatsModule } from '../transports/nats.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserSchema } from './schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    NatsModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, BcryptJsAdapter],
  exports: [],
})
export class AuthModule {}
