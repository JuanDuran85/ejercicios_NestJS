import {
  IsEmail,
  IsNumberString,
  IsOptional,
  MinLength
} from 'class-validator';

export class SignInDto {
  @IsEmail()
  email: string;

  @MinLength(10)
  password: string;

  @IsOptional()
  @IsNumberString()
  tfaCode?: string;

  constructor(email: string, password: string, tfaCode?: string) {
    this.email = email;
    this.password = password;
    this.tfaCode = tfaCode;
  }
}
