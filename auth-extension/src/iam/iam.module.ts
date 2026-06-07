import { Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { BcryptjsService } from './hashing/bcryptjs.service';
import { HashingService } from './hashing/hashing.service';
import { AuthenticationController } from './authentication/authentication.controller';
import { AuthenticationService } from './authentication/authentication.service';

@Module({
  providers: [
    {
      provide: HashingService,
      useClass: BcryptjsService,
    },
    AuthenticationService,
  ],
  imports: [CommonModule],
  exports: [],
  controllers: [AuthenticationController],
})
export class IamModule {}
