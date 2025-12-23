import { Injectable } from '@nestjs/common';

@Injectable()
export class FilesService {
  public uploadImageFile(file: Express.Multer.File) {
    return file;
  }
}
