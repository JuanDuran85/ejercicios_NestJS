import { SingInDto } from './dto/signin.dto';
import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SingUpDto } from './dto/singup.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly _authService: AuthService){}

    @Post('/singup')
    @UsePipes(ValidationPipe)
    async singUp(@Body() singUpDto: SingUpDto): Promise<void>{
        return this._authService.signUp(singUpDto);
    }
    
    @Post('/singin')
    @UsePipes(ValidationPipe)
    async signIn(@Body() signInDto: SingInDto){
        return this._authService.signIn(signInDto);
    }
}
