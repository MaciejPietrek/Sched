import { Controller, Get } from '@nestjs/common';

import { IResponse, Message } from '@mfe-app/api-interfaces';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  sayHello(): string {
    return 'hello';
  }

  @Get('checkConnection')
  getData(): IResponse {
    return {
      data: { message: 'everything is okay', timestamp: Number(new Date()) },
      status: 'OK',
    };
  }
}
