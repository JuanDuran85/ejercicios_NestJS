import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {
  Permission,
  PermissionType,
} from '../../iam/authorization/permission.type';
import { ApiKey } from '../api-key/entities/api-key.entity';
import { Role } from '../enums/roles.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ enum: Role, default: Role.Regular })
  role!: Role;

  @JoinTable()
  @OneToMany((type) => ApiKey, (apiKey: ApiKey) => apiKey.user)
  apiKeys!: ApiKey[];

  @Column({ enum: Permission, default: [], type: 'json' })
  permissions!: PermissionType[];
}
