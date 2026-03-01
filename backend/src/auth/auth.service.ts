import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { LoginRequestDto } from './dto/login.dto';
import { LoginResponse } from './interface/login.interface';
import { ProfileResponse } from './interface/profile.interface';

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

  async getProfile(userId: string): Promise<ProfileResponse> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId, is_delete: false },
      include: {
        role: {
          include: {
            role_permissions: {
              include: {
                permission: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const response: ProfileResponse = {
      id: user.id,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone: user.phone,
      role: user.role.name,
      permissions: user.role.role_permissions.map((rp) => rp.permission.name),
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
    return response;
  }
}
