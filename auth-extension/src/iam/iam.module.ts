import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '../common';
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
  imports: [CommonModule, TypeOrmModule.forFeature([User])],
  exports: [],
  controllers: [AuthenticationController],
})
export class IamModule {}
