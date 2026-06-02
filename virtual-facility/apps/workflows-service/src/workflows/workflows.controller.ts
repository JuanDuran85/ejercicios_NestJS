import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWorkflowDto } from '../../../../libs/workflows/src/dto/create-workflow.dto';
import { UpdateWorkflowDto } from '../../../../libs/workflows/src/dto/update-workflow.dto';
import { Inbox } from '../inbox/entities/inbox.entity';
import { WorkflowsService } from './workflows.service';

@Controller('workflows')
export class WorkflowsController {
  constructor(
    private readonly workflowsService: WorkflowsService,
    @InjectRepository(Inbox)
    private readonly inboxRepository: Repository<Inbox>,
  ) {}

  @EventPattern('workflows.create')
  public async create(
    @Payload() createWorkflowDto: CreateWorkflowDto,
    @Ctx() context: RmqContext,
  ) {
    const message: Record<string, any> = context.getMessage();
    const inboxMessage: Inbox | null = await this.inboxRepository.findOne({
      where: {
        messageId: message.properties.messageId,
      },
    });
    if (!inboxMessage) {
      await this.inboxRepository.save({
        messageId: message.properties.messageId,
        pattern: context.getPattern(),
        status: 'pending',
        payload: createWorkflowDto,
      });
    }

    const channel = context.getChannelRef();
    channel.ack(message);
    return this.workflowsService.create(createWorkflowDto);
  }

  @Get()
  public findAll() {
    return this.workflowsService.findAll();
  }

  @Get(':id')
  public findOne(@Param('id') id: string) {
    return this.workflowsService.findOne(+id);
  }

  @Patch(':id')
  public update(
    @Param('id') id: string,
    @Body() updateWorkflowDto: UpdateWorkflowDto,
  ) {
    return this.workflowsService.update(+id, updateWorkflowDto);
  }

  @Delete(':id')
  public remove(@Param('id') id: string) {
    return this.workflowsService.remove(+id);
  }
}
