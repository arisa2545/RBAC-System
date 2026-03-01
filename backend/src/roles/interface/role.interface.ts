export interface GetRoleWithPermissionResponse {
  id: string;
  name: string;
  description: string;
  permission: Array<RolePermissionResponse>;
}

export interface RolePermissionResponse {
  id: string;
  name: string;
}
