import { IsNotEmpty, IsString, Min } from 'class-validator';


export class SingInDto {
    @IsNotEmpty()
    @IsString()
    @Min(3)
    username: string;

    @IsNotEmpty()
    @IsString()
    @Min(6)
    password: string;
}