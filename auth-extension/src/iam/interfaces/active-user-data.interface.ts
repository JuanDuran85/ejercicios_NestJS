import { Role } from '../../users/enums/roles.enum';

export interface ActiveUserData {
  sub: string | number;
  email: string;
  role: Role;
}
