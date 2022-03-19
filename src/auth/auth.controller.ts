import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<any> {
    try {
      const res = await this.authService.signin(email, password);
      return { result: res };
    } catch (error) {
      return error;
    }
  }

  @Post('/signup')
  async saveUser(
    @Body('userName') userName: any,
    @Body('email') email: any,
    @Body('password') password: any,
  ): Promise<any> {
    return await this.authService.saveUser(userName, email, password);
  }
}