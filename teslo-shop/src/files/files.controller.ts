import {
  BadRequestException,
  Controller,
  Get,
  Param,
  ParseFilePipe,
  Post,
  Query,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { fileFilter } from './helpers/fileFilter.helper';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('products')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter,
      limits: { fileSize: 100_000 },
    }),
  )
  public uploadProductImageFile(
    @UploadedFile(new ParseFilePipe())
    file: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('File have to be an image');
    return this.filesService.uploadImageFile(file);
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
