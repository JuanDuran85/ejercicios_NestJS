import { Injectable, Logger } from '@nestjs/common';
import {
    UploadApiErrorResponse,
    UploadApiResponse,
    UploadStream,
    v2 as cloudinary,
} from 'cloudinary';
import * as streamifier from 'streamifier';

@Injectable()
export class CloudinaryService {
  private readonly logger: Logger = new Logger(CloudinaryService.name);

  public async uploadImage(
    file: Express.Multer.File,
    folder: string = 'products',
  ): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const uploadStream: UploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: 'image',
        },
        (
          error: UploadApiErrorResponse | undefined,
          result: UploadApiResponse | undefined,
        ) => {
          if (error) {
            this.logger.error('Failed to upload image to Cloudinary', error);
            reject(error);
          } else if (!result) {
            const errorMessage = 'Upload result is undefined';
            this.logger.error(errorMessage);
            reject(new Error(errorMessage));
          } else {
            this.logger.log(
              `Image uploaded successfully: ${result.secure_url}`,
            );
            resolve(result);
          }
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }

  public async deleteImage(publicId: string): Promise<void> {
    try {
      await cloudinary.uploader.destroy(publicId);
      this.logger.log(`Image deleted successfully: ${publicId}`);
    } catch (error) {
      this.logger.error('Failed to delete image from Cloudinary', error);
      throw error;
    }
  }
}
