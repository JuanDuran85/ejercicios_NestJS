import { IsNumber, IsString } from 'class-validator';

export class CreateWorkflowDto {
  @IsString()
  name: string;
  @IsNumber()
  buildingId: number;

  constructor(name: string, buildingId: number) {
    this.name = name;
    this.buildingId = buildingId;
  }
}
