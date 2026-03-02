import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import {
  GetAllRoleResponse,
  GetRoleWithPermissionResponse,
} from './interface/role.interface';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateRolePermissionsDto } from './dto/role.dto';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { PermissionEnum } from 'src/enum/permission';
import { RequirePermissions } from 'src/auth/decorators/permissions.decorator';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @RequirePermissions(PermissionEnum.VIEW_ROLE_PERMISSION)
  @Get()
  async getAllRole(): Promise<Array<GetAllRoleResponse>> {
    return await this.rolesService.getAllRole();
  }

  @RequirePermissions(PermissionEnum.VIEW_ROLE_PERMISSION)
  @Get('permissions')
  async getAllRoleWithPermission(): Promise<
    Array<GetRoleWithPermissionResponse>
  > {
    return await this.rolesService.getAllRoleWithPermission();
  }

  @RequirePermissions(PermissionEnum.VIEW_ROLE_PERMISSION)
  @Get(':id')
  async getRoleDetails(
    @Param('id') roleId: string,
  ): Promise<GetRoleWithPermissionResponse> {
    return await this.rolesService.getRoleDetails(roleId);
  }

  @RequirePermissions(PermissionEnum.MANAGE_ROLE_PERMISSION)
  @Put(':id/permissions')
  async updatePermissions(
    @Param('id') roleId: string,
    @Body() updateData: UpdateRolePermissionsDto,
  ) {
    return this.rolesService.updateRolePermissions(roleId, updateData);
  }
}
