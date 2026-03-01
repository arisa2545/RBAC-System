import type { ILoginPayload, ILoginResponse } from "@/interface/login.interface";
import type { ICustomMutationOptions, IErrorResponse } from "@/interface/tanstack.interface";
import { useCustomMutation } from "@/lib/api";
import api from "@/lib/axios";
import type { AxiosError } from "axios";

export const useLogin = (
  options?: ICustomMutationOptions<
    ILoginResponse,
    AxiosError<IErrorResponse>,
    ILoginPayload
  >,
) => {
  return useCustomMutation<
    ILoginResponse,
    AxiosError<IErrorResponse>,
    ILoginPayload
  >({
    mutationKey: ['login'],
    mutationFn: async (payload: ILoginPayload) => {
      const { data } = await api.post<ILoginResponse>(
        '/auth/login',
        payload,
      );
      return data;
    },
    ...options,
  });
};