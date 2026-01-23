import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from '../users/users.module';

@Module({
  providers: [AuthResolver, AuthService],
  imports: [UsersModule],
  controllers: [],
  exports: [AuthService],
})
export class AuthModule {}
