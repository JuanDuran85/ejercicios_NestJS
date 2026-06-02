import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InboxModule } from '../inbox/inbox.module';
import { Workflow } from './entities/workflow.entity';
import { WorkflowsInboxProcessor } from './workflows-inbox.processor';
import { WorkflowsController } from './workflows.controller';
import { WorkflowsService } from './workflows.service';

@Module({
  controllers: [WorkflowsController],
  providers: [WorkflowsService, WorkflowsInboxProcessor],
  imports: [TypeOrmModule.forFeature([Workflow]), InboxModule],
})
export class WorkflowsModule {}
