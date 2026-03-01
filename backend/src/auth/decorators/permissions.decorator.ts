import { SetMetadata } from '@nestjs/common';
import { PermissionEnum } from 'src/enum/permission';

export const PERMISSIONS_KEY = 'permissions';

export const RequirePermissions = (...permissions: Array<PermissionEnum>) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
