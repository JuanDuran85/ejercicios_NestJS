import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger: Logger = new Logger(GlobalExceptionFilter.name);

  public catch(exception: unknown, host: ArgumentsHost): void {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const request: Request = ctx.getRequest<Request>();
    const response: Response = ctx.getResponse<Response>();

    if (exception instanceof HttpException) {
      const status: number = exception.getStatus();
      const exceptionResponse: string | object = exception.getResponse();

      response.status(status).json({
        statusCode: status,
        message:
          typeof exceptionResponse === 'string'
            ? exceptionResponse
            : (exceptionResponse as Record<string, unknown>).message,
        error: HttpStatus[status] ?? 'Error',
        path: request.url,
        method: request.method,
        timestamp: new Date().toISOString(),
      });
      return;
    }

    const errorMessage: string =
      exception instanceof Error ? exception.message : 'Unknown Error';
    const errorStack: string | undefined =
      exception instanceof Error ? exception.stack : undefined;

    this.logger.error(
      `${request.method} ${request.url} → 500: ${errorMessage}`,
      errorStack,
    );

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal Server Error',
      error: 'Internal Server Error',
      path: request.url,
      method: request.method,
      timestamp: new Date().toISOString(),
    });
  }
}
