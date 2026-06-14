import { CallHandler } from "@nestjs/common";

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

  exec(next: CallHandler) {
    return next.handle().pipe(
        tap({})
    )
  }
}
