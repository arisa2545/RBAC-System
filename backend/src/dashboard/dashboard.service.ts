import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DashboardResponse } from './interface/dashboard.interface';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getDashboard(): Promise<DashboardResponse> {
    const userCounts = await this.prisma.user.count({
      where: { is_delete: false },
    });
    const roleCounts = await this.prisma.role.count();
    const permissionCounts = await this.prisma.permission.count();
    const response: DashboardResponse = {
      total_user: userCounts,
      total_role: roleCounts,
      total_permission: permissionCounts,
    };
    return response;
  }
}
