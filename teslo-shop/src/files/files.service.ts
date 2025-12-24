import { Injectable } from '@nestjs/common';
import { CloudinaryService } from '../common/cloudinary/cloudinary.service';
import { UploadApiResponse } from 'cloudinary';

@Injectable()
export class FilesService {
  constructor(private readonly cloudinaryService: CloudinaryService) {}
  public async uploadImageFile(file: Express.Multer.File) {
    const result: UploadApiResponse = await this.cloudinaryService.uploadImage(
      file,
      'products',
    );

    return {
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
    };
  }
}
