import { IsString } from 'class-validator';

export class CreateBuildingDto {
  @IsString()
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}
