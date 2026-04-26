import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min, MinLength } from "class-validator";

export class CreateProductDto {
    @IsString()
    @MinLength(1)
    @IsNotEmpty()
    name: string;
    
    @IsString()
    @MinLength(5)
    @IsOptional()
    description?: string;

    @IsNumber()
    @Min(0)
    @Type(() => Number)
    price: number;


    constructor(name: string, description: string, price: number) {
        this.name = name;
        this.description = description;
        this.price = price;
    }
}
