import { IntervalHost } from '../scheduler/decorators/interval-host.decorator';
import { interval } from '../scheduler/decorators/interval.decorator';

@IntervalHost
export class CronService {
  @interval(7000)
  public everySecond() {
    console.debug('This will be logged every second...');
  }
}
