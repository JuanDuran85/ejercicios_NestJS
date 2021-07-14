import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { RoleType } from 'src/modules/role/roletype.enum';
import { UserDetails } from '../user.details.entity';

export class UserDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
  
  @IsNotEmpty()
  roles: RoleType[];
  
  @IsNotEmpty()
  details: UserDetails;
}
