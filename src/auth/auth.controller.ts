import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/create-auth.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async login(@Body() loginDto: LoginAuthDto) {
    try {
      const { email, username, password } = loginDto;
      return await this.authService.login(email, username, password);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: error.stack,
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    }

  }

}
