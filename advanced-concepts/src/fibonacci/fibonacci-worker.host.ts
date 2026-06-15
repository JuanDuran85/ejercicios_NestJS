import {
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { join } from 'node:path';
import { filter, firstValueFrom, fromEvent, map, Observable } from 'rxjs';
import { Worker } from 'node:worker_threads';

@Injectable()
export class FibonacciWorkerHost
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private worker: Worker = {} as Worker;
  private message$: Observable<{ id: string; result: number }> =
    {} as Observable<{
      id: string;
      result: number;
    }>;

  constructor() {}

  public onApplicationBootstrap() {
    this.worker = new Worker(join(__dirname, 'fibonacci.worker.js'));
    this.message$ = fromEvent(this.worker, 'message') as unknown as Observable<{
      id: string;
      result: number;
    }>;
  }
  public async onApplicationShutdown() {
    this.worker.terminate();
  }
  
  public run(n: number) {
    const uniqueId = randomUUID();
    this.worker.postMessage({ n, id: uniqueId });
    return firstValueFrom(
      this.message$.pipe(
        filter(({ id }) => id === uniqueId),
        map(({ result }) => result),
      ),
    );
  }
}
