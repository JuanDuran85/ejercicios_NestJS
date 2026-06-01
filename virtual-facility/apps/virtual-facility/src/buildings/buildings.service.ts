import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';
import { Building } from './entities/building.entity';

@Injectable()
export class BuildingsService {
  constructor(
    @InjectRepository(Building)
    private readonly buildingRepository: Repository<Building>,
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
    return fetch('http://workflows-service:3001/workflows', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: 'My Workflow', buildingId }),
    }).then((res) => res.text());
  }
}
