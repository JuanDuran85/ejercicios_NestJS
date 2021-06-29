import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
  Length,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 20)
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(5)
  @IsNotEmpty()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Passwords will contain at least 1 upper case letter, Passwords will contain at least 1 lower case letter, Passwords will contain at least 1 number or special character',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
