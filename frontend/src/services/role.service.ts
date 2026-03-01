import type { IGetAllRoleResponse, IGetRoleWithPermissionResponse, IUpdateRolePermissionPayload } from "@/interface/role.interface";
import type { ICustomMutationOptions, IErrorResponse } from "@/interface/tanstack.interface";
import api from "@/lib/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

export interface IUpdateRolePermissionVariables {
  roleId: string;
  payload: IUpdateRolePermissionPayload;
}

export const useGetAllRole = () => {
  return useQuery({
    queryKey: ['getAllRole'],
    queryFn: async () => {
      const response = await api.get<Array<IGetAllRoleResponse>>(`/roles`);
      return response.data;
    },
    staleTime: Infinity
  });
};

export const useRoleWithPermission = () => {
  return useQuery({
    queryKey: ['getAllRoleWithPermission'],
    queryFn: async () => {
      const response = await api.get<Array<IGetRoleWithPermissionResponse>>(`/roles/permissions`);
      return response.data;
    },
    staleTime: Infinity
  });
};


export const useRoleDetails = (roleId: string) => {
  return useQuery({
    queryKey: ['getRoleDetails', roleId],
    queryFn: async () => {
      const response = await api.get<IGetRoleWithPermissionResponse>(`/roles/${roleId}`);
      return response.data;
    },
    staleTime: Infinity
  });
};

export const useUpdateRolePermission = (
  options?: ICustomMutationOptions<
    IGetRoleWithPermissionResponse,
    AxiosError<IErrorResponse>,
    IUpdateRolePermissionVariables
  >,
) => {
  return useMutation<
    IGetRoleWithPermissionResponse,
    AxiosError<IErrorResponse>,
    IUpdateRolePermissionVariables
  >({
    mutationKey: ['updateRolePermission'],
    mutationFn: async ({ roleId, payload }) => {
      const { data } = await api.put<IGetRoleWithPermissionResponse>(
        `/roles/${roleId}/permissions`,
        payload,
      );
      return data;
    },
    ...options,
  });
};
