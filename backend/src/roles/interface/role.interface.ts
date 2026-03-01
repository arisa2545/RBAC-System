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

export interface GetAllRoleResponse {
  id: string;
  name: string;
  description: string | null;
}
