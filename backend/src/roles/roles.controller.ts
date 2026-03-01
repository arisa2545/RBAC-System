import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { GetRoleWithPermissionResponse } from './interface/role.interface';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateRolePermissionsDto } from './dto/role.dto';

@UseGuards(JwtAuthGuard)
@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Get()
  async getDashboard(): Promise<Array<GetRoleWithPermissionResponse>> {
    return await this.rolesService.getAllRoleWithPermission();
  }

  @Put(':id/permissions')
  async updatePermissions(
    @Param('id') roleId: string,
    @Body() updateData: UpdateRolePermissionsDto,
  ) {
    return this.rolesService.updateRolePermissions(roleId, updateData);
  }
}
