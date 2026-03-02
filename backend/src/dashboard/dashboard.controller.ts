import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { DashboardService } from './dashboard.service';
import { DashboardResponse } from './interface/dashboard.interface';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { RequirePermissions } from 'src/auth/decorators/permissions.decorator';
import { PermissionEnum } from 'src/enum/permission';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @RequirePermissions(PermissionEnum.VIEW_DASHBOARD)
  @Get()
  async getDashboard(): Promise<DashboardResponse> {
    return await this.dashboardService.getDashboard();
  }
}
