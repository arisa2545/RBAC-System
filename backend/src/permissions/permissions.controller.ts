import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PermissionsService } from './permissions.service';
import { GetAllPermissionResponse } from './interface/permission.interface';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { RequirePermissions } from 'src/auth/decorators/permissions.decorator';
import { PermissionEnum } from 'src/enum/permission';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('permissions')
export class PermissionsController {
  constructor(private permissionsService: PermissionsService) {}

  @RequirePermissions(PermissionEnum.VIEW_ROLE_PERMISSION)
  @Get()
  async getAllPermission(): Promise<Array<GetAllPermissionResponse>> {
    return await this.permissionsService.getAllPermission();
  }
}
