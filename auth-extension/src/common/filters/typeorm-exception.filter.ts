import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpStatus,
    Logger,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { type Request, type Response } from 'express';
import { QueryFailedError } from 'typeorm';

interface PostgresError {
  code: string;
  detail?: string;
  table?: string;
  constraint?: string;
}

@Catch(QueryFailedError)
export class TypeOrmExceptionFilter implements ExceptionFilter<QueryFailedError> {
  private readonly logger: Logger = new Logger(TypeOrmExceptionFilter.name);

  catch(exception: QueryFailedError, host: ArgumentsHost): void {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const request: Request = ctx.getRequest<Request>();
    const response: Response = ctx.getResponse<Response>();
    this.logger.error(exception);

    const pgError = exception.driverError as unknown as PostgresError;
    const { status, message } = this.mapPostgresError(pgError);

    this.logger.warn(
      `${request.method} ${request.url} → ${status}: ${message} [${pgError.code}]`,
    );

    response.status(status).json({
      statusCode: status,
      message,
      error: HttpStatus[status] ?? 'Error',
      path: request.url,
      method: request.method,
      timestamp: new Date().toISOString(),
    });
  }

  private mapPostgresError(error: PostgresError): {
    status: number;
    message: string;
  } {
    switch (error.code) {
      case '23505': // unique_violation
        return {
          status: HttpStatus.CONFLICT,
          message: this.extractUniqueMessage(error.detail),
        };

      case '23503': // foreign_key_violation
        return {
          status: HttpStatus.BAD_REQUEST,
          message: 'Reference to a non-existent resource',
        };

      case '23502': // not_null_violation
        return {
          status: HttpStatus.BAD_REQUEST,
          message: 'Required field is missing',
        };

      case '22P02': // invalid_text_representation
        return {
          status: HttpStatus.BAD_REQUEST,
          message: 'Invalid value for the field',
        };

      default:
        return {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal server error',
        };
    }
  }

  private extractUniqueMessage(detail?: string): string {
    if (!detail) return 'Duplicate entry';

    // detail: "Key (email)=(domin@domin.es) already exists."
    const match: RegExpExecArray | null = new RegExp(
      /Key \((.+?)\)=\((.+?)\)/,
    ).exec(detail);
    if (match) {
      return `The field "${match[1]}" with value "${match[2]}" all ready exists`;
    }
    return 'Duplicate entry';
  }
}
