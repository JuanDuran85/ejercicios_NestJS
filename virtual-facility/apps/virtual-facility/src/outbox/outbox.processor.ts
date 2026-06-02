import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy, RmqRecord } from '@nestjs/microservices';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { lastValueFrom } from 'rxjs';
import { Repository } from 'typeorm';
import { WORKFLOWS_SERVICE } from '../constants';
import { Outbox } from './entities/outbox.entity';
import { OutboxService } from './outbox.service';

@Injectable()
export class OutboxProcessor {
  private readonly logger: Logger = new Logger(OutboxProcessor.name);

  constructor(
    private readonly outboxService: OutboxService,
    @Inject(WORKFLOWS_SERVICE) private readonly workflowsService: ClientProxy,
    @InjectRepository(Outbox)
    private readonly outboxRepository: Repository<Outbox>,
  ) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  public async processOutboxMessages() {
    this.logger.debug('Processing outbox messages');

    const messages: Outbox[] = await this.outboxService.getUnprocessedMessages({
      target: WORKFLOWS_SERVICE.description,
      take: 100,
    });

    await Promise.all(
      messages.map(async (message: Outbox) => {
        await this.dispatchWorkflowEvent(message);
        await this.outboxRepository.delete(message.id);
      }),
    );
  }

  public async dispatchWorkflowEvent(outbox: Outbox) {
    this.logger.log(`Dispatching workflow event: ${outbox.type}`);
    const rmqRecord: RmqRecord<Record<string, any>> = new RmqRecord(
      outbox.payload,
      {
        messageId: `${outbox.id}`,
      },
    );
    await lastValueFrom(this.workflowsService.emit(outbox.type, rmqRecord));
  }
}
