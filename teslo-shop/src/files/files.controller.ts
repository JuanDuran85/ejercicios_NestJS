import {
  BadRequestException,
  Controller,
  Get,
  Param,
  ParseFilePipe,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { fileFilter } from './helpers/fileFilter.helper';
import { diskStorage } from 'multer';
import { fileNamer } from './helpers';

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
  ) {
    if (!file) throw new BadRequestException('File have to be an image');
    console.debug(file);
    return this.filesService.uploadImageFileLocal(file);
  }

  @Get('products/:publicId')
  public async getProductImage(
    @Req() req: Express.Request,
    @Param('publicId') publicId: string,
  ) {
    //@ts-ignore
    const folderPath: string = `${req.route.path.split('/')[3]}/${publicId}`;
    const secureUrl: string =
      await this.filesService.getImageByPublicId(folderPath);
    return { secureUrl };
  }
}
