import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import {
  GetAllRoleResponse,
  GetRoleWithPermissionResponse,
} from './interface/role.interface';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateRolePermissionsDto } from './dto/role.dto';

@UseGuards(JwtAuthGuard)
@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Get()
  async getAllRole(): Promise<Array<GetAllRoleResponse>> {
    return await this.rolesService.getAllRole();
  }

  @Get(':id')
  async getRoleDetails(
    @Param('id') roleId: string,
  ): Promise<GetRoleWithPermissionResponse> {
    return await this.rolesService.getRoleDetails(roleId);
  }

  @Get('permissions')
  async getAllRoleWithPermission(): Promise<
    Array<GetRoleWithPermissionResponse>
  > {
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
