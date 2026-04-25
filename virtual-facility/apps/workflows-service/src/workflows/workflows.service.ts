import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWorkflowDto } from './dto/create-workflow.dto';
import { UpdateWorkflowDto } from './dto/update-workflow.dto';
import { Workflow } from './entities/workflow.entity';

@Injectable()
export class WorkflowsService {
  constructor(
    @InjectRepository(Workflow)
    private readonly workflowsRepository: Repository<Workflow>,
  ) {}

  public async findAll(): Promise<Workflow[]> {
    return this.workflowsRepository.find();
  }

  public async findOne(id: number): Promise<Workflow> {
    const workflow: Workflow | null = await this.workflowsRepository.findOne({
      where: { id },
    });
    if (!workflow) {
      throw new NotFoundException(`Workflow #${id} does not exist`);
    }
    return workflow;
  }

  public async create(createWorkflowDto: CreateWorkflowDto): Promise<Workflow> {
    const workflow: Workflow = this.workflowsRepository.create({
      ...createWorkflowDto,
    });
    return this.workflowsRepository.save(workflow);
  }

  public async update(
    id: number,
    updateWorkflowDto: UpdateWorkflowDto,
  ): Promise<Workflow> {
    const workflow: Workflow | undefined =
      await this.workflowsRepository.preload({
        id: +id,
        ...updateWorkflowDto,
      });

    if (!workflow) {
      throw new NotFoundException(`Workflow #${id} does not exist`);
    }
    return this.workflowsRepository.save(workflow);
  }

  public async remove(id: number): Promise<Workflow> {
    const workflow: Workflow = await this.findOne(id);
    return this.workflowsRepository.remove(workflow);
  }
}
