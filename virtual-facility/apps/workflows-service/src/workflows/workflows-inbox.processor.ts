import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EntityManager, Repository } from 'typeorm';
import { Inbox } from '../inbox/entities/inbox.entity';
import { InboxService } from '../inbox/inbox.service';
import { Workflow } from './entities/workflow.entity';

@Injectable()
export class WorkflowsInboxProcessor {
  private readonly logger: Logger = new Logger(WorkflowsInboxProcessor.name);

  constructor(private readonly inboxService: InboxService) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  public async processInboxMessages(): Promise<void> {
    this.logger.debug(`Processing inbox messages`);

    await this.inboxService.processInboxMessages(
      async (messages: Inbox[], manager: EntityManager) => {
        return Promise.all(
          messages.map((message: Inbox) => {
            if (message.pattern === 'workflows.create') {
              return this.createWorkflow(message, manager);
            }
          }),
        );
      },
      {
        take: 100,
      },
    );
  }

  public async createWorkflow(
    message: Inbox,
    manager: EntityManager,
  ): Promise<void> {
    const workflowsRepository: Repository<Workflow> =
      manager.getRepository(Workflow);

    const workflow: Workflow = workflowsRepository.create({
      ...message.payload,
    });
    const newWorkflowEntity: Workflow =
      await workflowsRepository.save(workflow);
    this.logger.debug(
      `Created workflow with id ${newWorkflowEntity.id} for building ${newWorkflowEntity.buildingId}`,
    );

    // Update the message status to "processed".
    await manager.update(Inbox, message.id, {
      status: 'processed',
    });
  }
}
