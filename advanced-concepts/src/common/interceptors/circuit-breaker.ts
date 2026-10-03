import { CallHandler } from '@nestjs/common';
import { Observable, tap, throwError } from 'rxjs';

const SUCCESS_THRESHOLD = 3; // the number of successful operations above which we close the circuit
const FAILURE_THRESHOLD = 3; // the number of failures above which we open the circuit
const OPEN_TO_HALF_OPEN_WAIT_TIME = 60_000; // 1 minute in milliseconds

enum CircuitBreakerState {
  Closed,
  Open,
  HalfOpen,
}

export class CircuitBreaker {
  private state: CircuitBreakerState = CircuitBreakerState.Closed;
  private successCount: number = 0;
  private failureCount: number = 0;
  private lastError: Error = {} as Error;
  private nextAttempt: number = 0;

  public exec(next: CallHandler): Observable<unknown> {
    if (this.state === CircuitBreakerState.Open) {
      if (this.nextAttempt > Date.now()) {
        return throwError(() => this.lastError);
      }
      this.state = CircuitBreakerState.HalfOpen;
    }
    return next.handle().pipe(
      tap({
        next: () => this.handleSuccess(),
        error: (err) => this.handleError(err),
      }),
    );
  }

  private handleSuccess(): void {
    this.failureCount = 0;
    if (this.state === CircuitBreakerState.HalfOpen) {
      this.successCount++;
    }
    if (this.state === CircuitBreakerState.HalfOpen) {
      this.successCount++;

      if (this.successCount >= SUCCESS_THRESHOLD) {
        this.successCount = 0;
        this.state = CircuitBreakerState.Closed;
      }
    }
  }

  private handleError(error: Error): void {
    this.failureCount++;
    if (
      !(this.failureCount >= FAILURE_THRESHOLD ||
    this.state === CircuitBreakerState.HalfOpen)
    ) {
      return;
    }

    this.state = CircuitBreakerState.Open;
    this.lastError = error;
    this.nextAttempt = Date.now() + OPEN_TO_HALF_OPEN_WAIT_TIME;
  }
}
