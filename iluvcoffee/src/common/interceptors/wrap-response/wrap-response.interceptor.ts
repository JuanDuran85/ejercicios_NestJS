import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable, tap } from 'rxjs';

@Injectable()
export class WrapResponseInterceptor implements NestInterceptor {
  public intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    console.debug('...BEFORE...');

    return next
      .handle()
      .pipe(map((data) => ({ data })))
      .pipe(tap((data) => console.debug('...AFTER...', data)));
  }
}
