import { IResponse } from '@mfe-app/api-interfaces';
import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { Schema } from 'mongoose';
import { AuthService } from './auth/auth.service';
import { IUserLogin } from './auth/user.interface';

var mongoosify = require('mongoosify');

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Post('hello')
  sayHello() {
    const schema = {
      $schema: 'http://json-schema.org/draft-07/schema#',
      title: 'Generated schema for Root',
      type: 'object',
      properties: {
        hello: {
          type: 'string',
        },
      },
      required: ['hello'],
    };

    const mongooseSchema = mongoosify(schema);

    const instanceSchema = new Schema(mongooseSchema);
    console.log(mongooseSchema);
    console.log(instanceSchema);
    //@ts-ignore
    console.log(JSON.stringify(instanceSchema.tree));
    return { hello: 'hello' };
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

  @Post('auth/signUp')
  async signUp(@Body() userInfo: IUserLogin) {
    Logger.log('auth/signUp');
    const token = await this.authService.authorize(userInfo);
    if (token) return token;
    else throw new UnauthorizedException(undefined, 'Invalid credentials');
  }
}
