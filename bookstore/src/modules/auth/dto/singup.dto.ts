import { IsNotEmpty, IsString, Min, IsEmail } from 'class-validator';


export class SingUpDto {
    @IsNotEmpty()
    @IsString()
    @Min(3)
    username: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Min(6)
    password: string;
}