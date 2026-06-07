import { Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { BcryptjsService } from './hashing/bcryptjs.service';
import { HashingService } from './hashing/hashing.service';

@Module({
  providers: [
    {
      provide: HashingService,
      useClass: BcryptjsService,
    },
  ],
  imports: [CommonModule],
  exports: [],
  controllers: [],
})
export class IamModule {}
