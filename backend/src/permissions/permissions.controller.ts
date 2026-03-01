import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PermissionsService } from './permissions.service';
import { GetAllPermissionResponse } from './interface/permission.interface';

@UseGuards(JwtAuthGuard)
@Controller('permissions')
export class PermissionsController {
  constructor(private permissionsService: PermissionsService) {}

  @Get()
  async getAllPermission(): Promise<Array<GetAllPermissionResponse>> {
    return await this.permissionsService.getAllPermission();
  }
}
