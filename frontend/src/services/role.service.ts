import type { IGetRoleWithPermissionResponse } from "@/interface/role.interface";
import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useRoleWithPermission = () => {
  return useQuery({
    queryKey: ['getRoleWithPermission'],
    queryFn: async () => {
      const response = await api.get<Array<IGetRoleWithPermissionResponse>>(`/roles/permissions`);
      return response.data;
    },
    staleTime: Infinity
  });
};
