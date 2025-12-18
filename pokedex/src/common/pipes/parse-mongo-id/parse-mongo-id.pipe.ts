import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {
  public transform(value: string, metadata: ArgumentMetadata) {
    if (!isValidObjectId(value))
      throw new BadRequestException(`Id ${value} is not valid mongoId`);
    return value;
  }
}
