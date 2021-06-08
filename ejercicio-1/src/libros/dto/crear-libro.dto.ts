/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsNumber, IsPositive, IsString, Length, Max, Min } from 'class-validator';

export class CrearLibroDto {
    @IsString()
    @IsNotEmpty()
    @Length(2,20)
    nombre: string;

    @IsString()
    @IsNotEmpty()
    autor: string;
    
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    @Min(1)
    @Max(2000)
    paginas: number;
};