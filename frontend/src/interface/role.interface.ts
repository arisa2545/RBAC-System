export interface IGetRoleWithPermissionResponse {
  id: string;
  name: string;
  description: string;
  permission: Array<IRolePermissionResponse>;
}

export interface IRolePermissionResponse {
  id: string;
  name: string;
}

export interface IGetAllRoleResponse {
  id: string;
  name: string;
  description: string | null;
}
