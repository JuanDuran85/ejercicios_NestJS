import { IsString, IsEmail, MinLength, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
    @IsString({message: 'El nombre debe ser un string'})
    @IsNotEmpty({message: 'El nombre es obligatorio'})
    @MinLength(2, {message: 'El nombre debe tener al menos 2 caracteres'})
    first_name: string;
    
    @IsString({message: 'El apellido debe ser un string'})
    @IsNotEmpty({message: 'El apellido es obligatorio'})
    @MinLength(2, {message: 'El apellido debe tener al menos 2 caracteres'})
    last_name: string;
    
    @IsEmail()
    @IsNotEmpty({message: 'El correo electrónico es obligatorio'})
    email: string;
    
    @IsNotEmpty({message: 'La contraseña es obligatoria'})
    @MinLength(4,{message: 'La contraseña debe tener al menos 4 caracteres'})
    password: string;
    
    @IsNotEmpty({message: 'La confirmación de la contraseña es obligatoria'})
    @MinLength(4,{message: 'La confirmación de la contraseña debe ser mayor a 4 caracteres'})
    password_confirmation: string;
}