import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('Global')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getBasic(): string {
    return this.appService.getHello();
  }
}
