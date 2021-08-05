import { Controller, Get } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    @Get('register')
    register(): string {
        return 'register';
    }
}
