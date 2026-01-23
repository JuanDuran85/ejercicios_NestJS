import { Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { UsersModule } from '../users/users.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthResolver, AuthService],
  imports: [UsersModule, CommonModule],
  controllers: [],
  exports: [AuthService],
})
export class AuthModule {}
