import { RoleType } from '../role/roletype.enum';

export interface JwtPayloadInterface {
    id: string;
    username: string;
    email: string;
    roles: RoleType[];
    iat?: Date;
}