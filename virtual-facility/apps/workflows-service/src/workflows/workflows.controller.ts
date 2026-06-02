import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CreateWorkflowDto } from '../../../../libs/workflows/src/dto/create-workflow.dto';
import { UpdateWorkflowDto } from '../../../../libs/workflows/src/dto/update-workflow.dto';
import { WorkflowsService } from './workflows.service';

@Controller('workflows')
export class WorkflowsController {
  constructor(private readonly workflowsService: WorkflowsService) {}

  @EventPattern('workflows.create')
  public create(@Payload() createWorkflowDto: CreateWorkflowDto) {
    console.debug({ createWorkflowDto });
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
