import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  GetAllRoleResponse,
  GetRoleWithPermissionResponse,
} from './interface/role.interface';
import { UpdateRolePermissionsDto } from './dto/role.dto';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  async getAllRole(): Promise<Array<GetAllRoleResponse>> {
    const masterRole = await this.prisma.role.findMany({
      select: {
        id: true,
        name: true,
        description: true,
      },
    });
    return masterRole;
  }

  async getAllRoleWithPermission(): Promise<
    Array<GetRoleWithPermissionResponse>
  > {
    const roleWithPermissions = await this.prisma.role.findMany({
      include: {
        role_permissions: {
          include: { permission: true },
        },
      },
    });
    const response: Array<GetRoleWithPermissionResponse> =
      roleWithPermissions.map((role) => {
        return {
          id: role.id,
          name: role.name,
          description: role.description ?? '',
          permission: role.role_permissions.map((rp) => ({
            id: rp.permission.id,
            name: rp.permission.name,
          })),
        };
      });
    return response;
  }

  async updateRolePermissions(roleId: string, data: UpdateRolePermissionsDto) {
    const role = await this.prisma.role.findUnique({ where: { id: roleId } });
    if (!role) {
      throw new NotFoundException('Role not found');
    }

    const newPermissionsData = data.permission_id_list.map((permissionId) => ({
      role_id: roleId,
      permission_id: permissionId,
    }));

    await this.prisma.$transaction([
      this.prisma.rolePermission.deleteMany({
        where: { role_id: roleId },
      }),

      ...(newPermissionsData.length > 0
        ? [
            this.prisma.rolePermission.createMany({
              data: newPermissionsData,
            }),
          ]
        : []),
    ]);

    return this.getRoleWithPermissions(roleId);
  }

  async getRoleWithPermissions(roleId: string) {
    const role = await this.prisma.role.findUnique({
      where: { id: roleId },
      include: {
        role_permissions: {
          include: { permission: true },
        },
      },
    });

    if (!role) return null;

    return {
      id: role.id,
      name: role.name,
      permissions: role.role_permissions.map((rp) => ({
        id: rp.permission.id,
        name: rp.permission.name,
      })),
    };
  }
}
