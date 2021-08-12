import { IsString, IsEmail, MinLength, IsNotEmpty, IsAlpha } from 'class-validator';

export class CreateUserDto {
    @IsString({message: 'El nombre debe ser un string y se esta recibiendo $value'})
    @IsAlpha('es-ES', {message: 'El nombre debe contener sólo letras y se esta recibiendo $value'})
    @IsNotEmpty({message: 'El nombre es obligatorio'})
    @MinLength(2, {message: 'El nombre debe tener al menos $constraint1 caracteres y se esta recibiendo $value'})
    first_name: string;
    
    @IsString({message: 'El apellido debe ser un string y se esta recibiendo $value'})
    @IsAlpha('es-ES', {message: 'El apellido debe contener sólo letras y se esta recibiendo $value'})
    @IsNotEmpty({message: 'El apellido es obligatorio'})
    @MinLength(2, {message: 'El apellido debe tener al menos $constraint1 caracteres y se esta recibiendo $value'})
    last_name: string;
    
    @IsEmail({}, {message: 'El correo electrónico no es válido'})
    @IsNotEmpty({message: 'El correo electrónico es obligatorio'})
    email: string;
    
    @IsNotEmpty({message: 'La contraseña es obligatoria'})
    @MinLength(4,{message: 'La contraseña debe tener al menos $constraint1 caracteres y se esta recibiendo $value'})
    password: string;
    
    @IsNotEmpty({message: 'La confirmación de la contraseña es obligatoria'})
    @MinLength(4,{message: 'La confirmación de la contraseña debe ser mayor a $constraint1 caracteres y se esta recibiendo $value'})
    password_confirmation: string;
}