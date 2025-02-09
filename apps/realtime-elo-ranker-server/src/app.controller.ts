import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('data')
  getData() {
    return this.appService.getData();
  }

  @Post('data')
  addData(@Body() data: string) {
    return this.appService.addData(data);
  }
}
