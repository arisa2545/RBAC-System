import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';
import { PermissionEnum } from 'src/enum/permission';
import { PrismaService } from 'src/prisma/prisma.service';

interface RequestWithUser extends Request {
  user: {
    userId?: string;
  };
}
@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<
      Array<PermissionEnum>
    >(PERMISSIONS_KEY, [context.getHandler(), context.getClass()]);

    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('User not found');
    }

    const userData = await this.prisma.user.findUnique({
      where: { id: user.userId },
      include: {
        role: {
          include: {
            role_permissions: {
              include: { permission: true },
            },
          },
        },
      },
    });

    if (!userData || !userData.role) {
      throw new ForbiddenException('User missing role data');
    }

    const userPermissions = userData.role.role_permissions.map(
      (rp) => rp.permission.name,
    );

    const hasPermission = requiredPermissions.every((permission) =>
      userPermissions.includes(permission),
    );

    if (!hasPermission) {
      throw new ForbiddenException('User not has permission (Forbidden)');
    }

    return true;
  }
}
