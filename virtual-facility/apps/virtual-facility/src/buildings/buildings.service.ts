import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { lastValueFrom } from 'rxjs';
import { Repository } from 'typeorm';
import { CreateWorkflowDto } from '../../../../libs/workflows/src/dto/create-workflow.dto';
import { WORKFLOWS_SERVICE } from '../constants';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';
import { Building } from './entities/building.entity';

@Injectable()
export class BuildingsService {
  constructor(
    @InjectRepository(Building)
    private readonly buildingRepository: Repository<Building>,
    @Inject(WORKFLOWS_SERVICE)
    private readonly workflowsClient: ClientProxy,
  ) {}

  public async create(createBuildingDto: CreateBuildingDto): Promise<Building> {
    const buildingCreated: Building = this.buildingRepository.create({
      ...createBuildingDto,
    });

    const newBuildingEntity: Building =
      await this.buildingRepository.save(buildingCreated);

    await this.createWorkflow(newBuildingEntity.id);
    return newBuildingEntity;
  }

  public findAll(): Promise<Building[]> {
    return this.buildingRepository.find();
  }

  public async findOne(id: number): Promise<Building> {
    const buildingFound: Building | null =
      await this.buildingRepository.findOneBy({ id });
    if (!buildingFound) {
      throw new NotFoundException(`Building not found by id: ${id}`);
    }
    return buildingFound;
  }

  public async update(
    id: number,
    updateBuildingDto: UpdateBuildingDto,
  ): Promise<Building> {
    const buildCreated: Building | undefined =
      await this.buildingRepository.preload({
        id: +id,
        ...updateBuildingDto,
      });

    if (!buildCreated)
      throw new NotFoundException(`Building not found by id: ${id}`);

    return this.buildingRepository.save(buildCreated);
  }

  public async remove(id: number): Promise<Building> {
    const buildFound: Building = await this.findOne(id);
    return this.buildingRepository.remove(buildFound);
  }

  public async createWorkflow(buildingId: number) {
    try {
      const newWorkflow: CreateWorkflowDto = await lastValueFrom(
        this.workflowsClient.send('workflows.create', {
          name: 'My Workflow',
          buildingId,
        }),
      );
      console.debug({ newWorkflow });
      return newWorkflow;
    } catch (error) {
      console.error(error);
      throw new RpcException(error as object);
    }
  }
}
