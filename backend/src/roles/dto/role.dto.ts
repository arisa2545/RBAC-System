import { IsArray, IsUUID } from 'class-validator';

export class UpdateRolePermissionsDto {
  @IsArray()
  @IsUUID('all', {
    each: true,
    message: 'Permission ID should valid UUID',
  })
  permission_id_list: string[];
}
