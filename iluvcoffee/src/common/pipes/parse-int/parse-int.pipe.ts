import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform {
  public transform(value: string, metadata: ArgumentMetadata): number {
    const valueParse: number = Number.parseInt(value, 10);
    if (!Number.isNaN(valueParse)) {
      return valueParse;
    }
    throw new BadRequestException(
      `Validation failed. "${value}" --> is not a number`,
    );
  }
}
