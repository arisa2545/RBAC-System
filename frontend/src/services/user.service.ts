import type { ICustomMutationOptions, IErrorResponse } from "@/interface/tanstack.interface";
import type { IGetAllUserResponse, IGetUserDetailResponse } from "@/interface/user.interface";
import api from "@/lib/axios";
import type { UpdateUserFormData } from "@/pages/user/EditUserInfo";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

export interface IUpdateUserVariables {
  userId: string;
  payload: UpdateUserFormData;
}

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
    queryKey: ['userDetails', userId],
    queryFn: async () => {
      const response = await api.get<IGetUserDetailResponse>(`/users/${userId}`);
      return response.data;
    },
    staleTime: Infinity
  });
};

export const useUpdateUserInfo = (
  options?: ICustomMutationOptions<
    IGetUserDetailResponse,
    AxiosError<IErrorResponse>,
    IUpdateUserVariables
  >,
) => {
  return useMutation<
    IGetUserDetailResponse,
    AxiosError<IErrorResponse>,
    IUpdateUserVariables
  >({
    mutationKey: ['updateRolePermission'],
    mutationFn: async ({ userId, payload }) => {
      const { data } = await api.patch<IGetUserDetailResponse>(
        `/users/${userId}`,
        payload,
      );
      return data;
    },
    ...options,
  });
};
