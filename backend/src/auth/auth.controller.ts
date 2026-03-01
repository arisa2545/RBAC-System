import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dto/login.dto';
import { LoginResponse } from './interface/login.interface';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { HeaderUser } from './decorators/header-user.decorator';
import type { JwtPayload } from './decorators/header-user.decorator';
import { ProfileResponse } from './interface/profile.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginRequestDto): Promise<LoginResponse> {
    return this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@HeaderUser() user: JwtPayload): Promise<ProfileResponse> {
    return this.authService.getProfile(user.userId);
  }
}
