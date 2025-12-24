import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [CloudinaryModule],
  exports: [CloudinaryService],
  providers: [CloudinaryService],
  controllers: [],
})
export class CommonModule {}
