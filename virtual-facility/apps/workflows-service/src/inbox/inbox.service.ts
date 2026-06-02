import { Injectable, Logger } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { Inbox } from './entities/inbox.entity';

@Injectable()
export class InboxService {
  private readonly logger: Logger = new Logger(InboxService.name);
  constructor(private readonly dataSource: DataSource) {}

  public async processInboxMessages(
    process: (messages: Inbox[], manager: EntityManager) => Promise<unknown>,
    options: { take: number },
  ) {
    try {
      return await this.dataSource.transaction(async (manager) => {
        const inboxRepository: Repository<Inbox> = manager.getRepository(Inbox);
        const messages: Inbox[] = await inboxRepository.find({
          where: {
            status: 'pending',
          },
          order: {
            createdAt: 'ASC',
          },
          take: options.take,
          lock: {
            mode: 'pessimistic_write',
            onLocked: 'nowait',
          },
        });
        await process(messages, manager);
      });
    } catch (error) {
      const errorMessage = error as Error;
      this.logger.error(errorMessage.message);
      return;
    }
  }
}
