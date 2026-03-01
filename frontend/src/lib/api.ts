
import type { IErrorResponse, IResponse } from '@/interface/tanstack.interface';
import { useMutation, useQuery } from '@tanstack/react-query';
import type { QueryKey, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

export const useCustomQuery = <TData>(
  options: UseQueryOptions<
    IResponse<TData>,
    AxiosError<IErrorResponse>,
    IResponse<TData>,
    QueryKey
  >,
) => {
  return useQuery<IResponse<TData>, AxiosError<IErrorResponse>, IResponse<TData>, QueryKey>({
    retry: false,
    refetchOnWindowFocus: false,
    ...options,
  });
};

export const useCustomMutation = <
  TData,
  TError = AxiosError<IErrorResponse>,
  TVariables = void,
  TContext = unknown,
>(
  options: UseMutationOptions<TData, TError, TVariables, TContext>,
) => {
  return useMutation<TData, TError, TVariables, TContext>({
    retry: false,
    ...options,
  });
};
