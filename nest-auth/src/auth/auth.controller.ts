import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserInterface } from './interfaces/user.interface';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){}

    @Post('register')
    register(@Body() body: CreateUserDto): Promise<UserInterface> {
        return this.authService.createUser(body);
    }

    @Post('login')
    login(@Body() body: LoginUserDto): Promise<any> {
        return this.authService.login(body);
    }
}
