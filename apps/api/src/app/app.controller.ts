import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  UnauthorizedException,
} from '@nestjs/common';

import { IResponse } from '@mfe-app/api-interfaces';

import { AuthService } from './auth/auth.service';
import { IUserLogin } from './auth/user.interface';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

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

  @Post('auth/signIn')
  async signIn(@Body() userInfo: IUserLogin) {
    Logger.log('auth/signIn');
    const token = await this.authService.authorize(userInfo);
    if (token) return token;
    else throw new UnauthorizedException(undefined, 'Invalid credentials');
  }
}
