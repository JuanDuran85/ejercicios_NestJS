import { Injectable } from '@nestjs/common';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';

@Injectable()
export class BuildingsService {
  public async create(createBuildingDto: CreateBuildingDto) {
    await this.createWorkflow(1);
    return 'This action adds a new building';
  }

  public findAll() {
    return `This action returns all buildings`;
  }

  public findOne(id: number) {
    return `This action returns a #${id} building`;
  }

  public update(id: number, updateBuildingDto: UpdateBuildingDto) {
    return `This action updates a #${id} building`;
  }

  public remove(id: number) {
    return `This action removes a #${id} building`;
  }

  public async createWorkflow(buildingId: number) {
    return fetch('http://localhost:3001/workflows', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'New Working Flow', buildingId }),
    });
  }
}
