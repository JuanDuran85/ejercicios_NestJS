import { Role } from '../../users/enums/roles.enum';
import { PermissionType } from '../authorization/permission.type';

export interface ActiveUserData {
  sub: string | number;
  email: string;
  role: Role;
  permissions: PermissionType[];
}
