import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { LoginRequestDto } from './dto/login.dto';
import { LoginResponse } from './interface/login.interface';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginRequestDto): Promise<LoginResponse> {
    const user = await this.prisma.user.findUnique({
      where: { username: loginDto.username, is_delete: false },
      include: { role: true },
    });

    if (!user) {
      throw new UnauthorizedException('Username not found');
    }

    const isPasswordValid = loginDto.password === user.password;

    if (!isPasswordValid) {
      throw new UnauthorizedException('Username or Password incorrect');
    }

    const payload = {
      sub: user.id,
      username: user.username,
      role: user.role.name,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role.name,
      },
    };
  }
}
