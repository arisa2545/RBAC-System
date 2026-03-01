import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  GetUserDetailResponse,
  GetUserResponse,
} from './interface/user.interface';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAllUser(): Promise<Array<GetUserResponse>> {
    const users = await this.prisma.user.findMany({
      where: { is_delete: false },
      include: {
        role: true,
      },
    });

    const response = users.map((user) => {
      const format: GetUserResponse = {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role.name,
      };
      return format;
    });

    return response;
  }

  async getUserDetails(userId: string): Promise<GetUserDetailResponse> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId, is_delete: false },
      include: {
        role: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const response: GetUserDetailResponse = {
      id: user.id,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone: user.phone,
      role_id: user.role_id,
      role: user.role.name,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    return response;
  }

  async updateUser(id: string, data: UpdateUserDto) {
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        ...data,
      },
      select: {
        id: true,
        username: true,
        first_name: true,
        last_name: true,
        role: { select: { name: true } },
      },
    });
    return updatedUser;
  }

  async softDeleteUser(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId, is_delete: false },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        is_delete: true,
      },
    });

    return {
      statusCode: 200,
      message: 'Delete user successful',
    };
  }
}
