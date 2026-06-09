import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import {
  Permission,
  PermissionType,
} from '../../iam/authorization/permission.type';
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

  @Column({ enum: Permission, default: [], type: 'json' })
  permissions!: PermissionType[];
}
