import {Controller, Get, Request, Post, UseGuards, Req, Render} from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import {AppService} from "./app.service";
@Controller()
export class AppController {
  constructor(
      private authService: AuthService,
      private  appService: AppService,

  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('hello')
  getHello(){
    return this.appService.getHello();
  }
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @Render('index.hbs')
  root() {
    return { message: 'Hello world!' };
  }
}