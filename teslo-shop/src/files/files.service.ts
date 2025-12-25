import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UploadApiResponse } from 'cloudinary';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { CloudinaryService } from '../common/cloudinary/cloudinary.service';
import { UploadFileResponse } from './interfaces/uploadFileResponse.interface';

@Injectable()
export class FilesService {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly configService: ConfigService,
  ) {}
  public async uploadImageFileRemote(file: Express.Multer.File) {
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

  public uploadImageFileLocal(
    file: Express.Multer.File,
  ): Partial<UploadFileResponse> {
    if (!file) throw new BadRequestException('File have to be an image');
    const hostApi: string | undefined = this.configService.get('HOST_API');
    if (!hostApi) throw new BadRequestException('Host API is required');
    const secureUrl: string = `${this.configService.get('HOST_API')}/files/products/${file.filename}`;
    return { secureUrl };
  }

  public async getImageByPublicId(path: string): Promise<string> {
    if (!path) {
      throw new NotFoundException('Public ID is required');
    }
    return await this.cloudinaryService.getImageUrl(path);
  }

  public getStaticImageLocal(imageName: string): string {
    if (!imageName) throw new BadRequestException('Image name is required');
    const pathLocalImage: string = join(
      __dirname,
      '../../static/products',
      imageName,
    );

    if (!existsSync(pathLocalImage))
      throw new NotFoundException('Image not found');

    return pathLocalImage;
  }
}
