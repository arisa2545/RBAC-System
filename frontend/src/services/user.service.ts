import type { IGetAllUserResponse, IGetUserDetailResponse } from "@/interface/user.interface";
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

export const useGetUserDetails = (userId: string) => {
  return useQuery({
    queryKey: ['userDetails'],
    queryFn: async () => {
      const response = await api.get<IGetUserDetailResponse>(`/users/${userId}`);
      return response.data;
    },
    staleTime: Infinity
  });
};
