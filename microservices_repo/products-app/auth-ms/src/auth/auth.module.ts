import { Module } from '@nestjs/common';
import { NatsModule } from '../transports/nats.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [NatsModule],
  exports: [],
})
export class AuthModule {}
