import { IsString, IsEmail, MinLength, IsNotEmpty, IsAlpha } from 'class-validator';

export class LoginUserDto {
    @IsEmail({}, {message: 'El correo electrónico no es válido'})
    @IsNotEmpty({message: 'El correo electrónico es obligatorio'})
    email: string;
    
    @IsNotEmpty({message: 'La contraseña es obligatoria'})
    @MinLength(4,{message: 'La contraseña debe tener al menos $constraint1 caracteres y se esta recibiendo $value'})
    password: string;
}