import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Workflow {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  buildingId: number;

  constructor(id: number, name: string, buildingId: number) {
    this.id = id;
    this.name = name;
    this.buildingId = buildingId;
  }
}
