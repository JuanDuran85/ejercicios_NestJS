import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  Logger
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger: Logger = new Logger(GlobalExceptionFilter.name);
  private readonly pgUniqueViolationErrorCode: string = '23505';
  public catch(exception: any, host: ArgumentsHost) {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const request: Request = ctx.getRequest();
    const response: Response = ctx.getResponse();

    console.debug(exception.response);
    console.error(request.url);
    console.error(request.statusCode);
    console.error(exception.message);
    console.error(exception.stack);
    console.error(exception.name);
    console.error(exception.cause);

    if (exception.message.includes(this.pgUniqueViolationErrorCode)) {
      response.status(400).json({ message: exception.message });
      return;
    }

    response.status(500).json({ message: exception.message });
  }
}
