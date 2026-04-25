import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';
import { Building } from './entities/building.entity';
import { CreateWorkflowDto } from '@app/workflows';

@Injectable()
export class BuildingsService {
  constructor(
    @InjectRepository(Building)
    private readonly buildingsRepository: Repository<Building>,
  ) {}

  public async create(createBuildingDto: CreateBuildingDto): Promise<Building> {
    const buildingCreated: Building = this.buildingsRepository.create({
      ...createBuildingDto,
    });
    const newBuildingEntity: Building =
      await this.buildingsRepository.save(buildingCreated);

    await this.createWorkflow(newBuildingEntity.id);
    return newBuildingEntity;
  }

  public findAll(): Promise<Building[]> {
    return this.buildingsRepository.find();
  }

  public async findOne(id: number): Promise<Building> {
    const buildingFound: Building | null =
      await this.buildingsRepository.findOneBy({ id });
    if (!buildingFound)
      throw new NotFoundException(`Building with id ${id} not found`);

    return buildingFound;
  }

  public async update(id: number, updateBuildingDto: UpdateBuildingDto) {
    const buildingPreLoaded: Building | undefined =
      await this.buildingsRepository.preload({
        id: +id,
        ...updateBuildingDto,
      });
    if (!buildingPreLoaded)
      throw new NotFoundException(`Building with id ${id} not found`);
    return this.buildingsRepository.save(buildingPreLoaded);
  }

  public async remove(id: number): Promise<Building> {
    const buildingFound: Building = await this.findOne(id);
    return this.buildingsRepository.remove(buildingFound);
  }

  public async createWorkflow(buildingId: number): Promise<any> {
    console.debug(
      JSON.stringify({
        name: 'My workflow',
        buildingId,
      } as CreateWorkflowDto),
    );

    const response: Response = await fetch(
      'http://workflows-service:3001/workflows',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'New Working Flow', buildingId }),
      },
    );

    const newWorkflow = await response.json();
    console.debug({ newWorkflow });
    return newWorkflow;
  }
}
