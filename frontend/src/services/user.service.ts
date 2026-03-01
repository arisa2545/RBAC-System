import type { IGetAllUserResponse } from "@/interface/user.interface";
import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetAllUser = () => {
  return useQuery({
    queryKey: ['userList'],
    queryFn: async () => {
      const response = await api.get<Array<IGetAllUserResponse>>(`/users`);
      return response.data;
    },
    staleTime: Infinity
  });
};
