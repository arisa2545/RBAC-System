import type { IGetAllPermissionResponse } from "@/interface/permission.interface";
import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetAllPermission = () => {
  return useQuery({
    queryKey: ['getAllPermission'],
    queryFn: async () => {
      const response = await api.get<Array<IGetAllPermissionResponse>>(`/permissions`);
      return response.data;
    },
    staleTime: Infinity
  });
};
