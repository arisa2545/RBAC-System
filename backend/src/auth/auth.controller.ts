import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dto/login.dto';
import { LoginResponse } from './interface/login.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginRequestDto): Promise<LoginResponse> {
    return this.authService.login(loginDto);
  }
}
