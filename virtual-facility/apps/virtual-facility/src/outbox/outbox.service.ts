import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Outbox } from './entities/outbox.entity';

@Injectable()
export class OutboxService {
  constructor(
    @InjectRepository(Outbox)
    private readonly outboxRepository: Repository<Outbox>,
  ) {}

  public async getUnprocessedMessages(options: {
    target: string | undefined;
    take: number;
  }): Promise<Outbox[]> {
    return this.outboxRepository.find({
      where: {
        target: options.target,
      },
      order: {
        createdAt: 'ASC',
      },
      take: options.take,
    });
  }
}
