import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetAllPermissionResponse } from './interface/permission.interface';

@Injectable()
export class PermissionsService {
  constructor(private prisma: PrismaService) {}

  async getAllPermission(): Promise<Array<GetAllPermissionResponse>> {
    const masterPermission = await this.prisma.permission.findMany({
      select: {
        id: true,
        name: true,
        description: true,
      },
    });
    return masterPermission;
  }
}
