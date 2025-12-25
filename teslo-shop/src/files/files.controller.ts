import {
  BadRequestException,
  Controller,
  Get,
  Header,
  Param,
  ParseFilePipe,
  Post,
  Req,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { createReadStream, ReadStream } from 'node:fs';
import { FilesService } from './files.service';
import { fileNamer } from './helpers';
import { fileFilter } from './helpers/fileFilter.helper';
import { UploadFileResponse } from './interfaces/uploadFileResponse.interface';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('products/remote')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter,
      limits: { fileSize: 100_000 },
    }),
  )
  public uploadProductImageFileRemote(
    @UploadedFile(new ParseFilePipe())
    file: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('File have to be an image');
    return this.filesService.uploadImageFileRemote(file);
  }

  @Post('products/local')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter,
      limits: { fileSize: 100_000 },
      storage: diskStorage({
        destination: './static/products',
        filename: fileNamer,
      }),
    }),
  )
  public uploadProductImageFileLocal(
    @UploadedFile(new ParseFilePipe())
    file: Express.Multer.File,
  ): Partial<UploadFileResponse> {
    return this.filesService.uploadImageFileLocal(file);
  }

  @Get('products/remote/:publicId')
  public async getProductImageRemote(
    @Req() req: Express.Request,
    @Param('publicId') publicId: string,
  ) {
    //@ts-ignore
    const folderPath: string = `${req.route.path.split('/')[3]}/${publicId}`;
    const secureUrl: string =
      await this.filesService.getImageByPublicId(folderPath);
    return { secureUrl };
  }

  @Get('products/local/:imageName')
  @Header('Content-Type', 'image/jpeg')
  public getProductImageLocal(@Param('imageName') imageName: string) {
    const stream: ReadStream = createReadStream(
      this.filesService.getStaticImageLocal(imageName),
    );
    return new StreamableFile(stream);
  }
}
