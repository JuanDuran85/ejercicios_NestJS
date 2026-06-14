import { Controller, Get, Query } from '@nestjs/common';
import { resolve } from 'node:path';
import Piscina from 'piscina';

@Controller('fibonacci')
export class FibonacciController {
  public fibonacciWorker: Piscina<any, any> = new Piscina({
    filename: resolve(__dirname, 'fibonacci.worker.js'),
  });
  @Get()
  public fibonacci(@Query('n') n: number = 10): Promise<any> {
    return this.fibonacciWorker.run(n);
  }
}
