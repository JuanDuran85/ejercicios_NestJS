import { Injectable, NotFoundException } from '@nestjs/common';
import { UploadApiResponse } from 'cloudinary';
import { CloudinaryService } from '../common/cloudinary/cloudinary.service';

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

  public async getImageByPublicId(path: string): Promise<string> {
    if (!path) {
      throw new NotFoundException('Public ID is required');
    }
    return await this.cloudinaryService.getImageUrl(path);
  }
}
