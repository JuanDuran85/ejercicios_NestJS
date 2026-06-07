import { IsEmail, MinLength } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  email: string;

  @MinLength(10)
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
