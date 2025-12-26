import { Module } from '@nestjs/common';
import { BcryptJsAdapter } from './adapters/bcryptjs.adapter';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { CloudinaryService } from './cloudinary/cloudinary.service';

@Module({
  imports: [CloudinaryModule],
  exports: [CloudinaryService, BcryptJsAdapter],
  providers: [CloudinaryService, BcryptJsAdapter],
  controllers: [],
})
export class CommonModule {}
