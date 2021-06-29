/* eslint-disable prettier/prettier */
import { IsBoolean, IsNotEmpty, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class TaskCreateDto {
    @IsNotEmpty({ message: 'El compo descripcion no puede estar vacio' })
    @IsString()
    @MinLength(5, { message: 'La descripcion debe ser nmayor a 5 caracteres' })
    @ApiProperty()
    readonly description: string;

    @IsBoolean({ message: 'El valor de done debe ser booleano' })
    @IsNotEmpty({ message: 'El compo done no puede estar vacio' })
    @ApiProperty()
    readonly done: boolean;

    @IsString()
    @IsNotEmpty({ message: 'El compo date no puede estar vacio' })
    @ApiProperty()
    readonly date: string;
}