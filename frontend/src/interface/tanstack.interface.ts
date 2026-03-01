import type { QueryKey, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

export interface IResponse<T> {
  code: string;
  message: string;
  data: T | null;
}

export interface IErrorResponse {
  is_success?: boolean;
  code?: string | number;
  message?: string;
  [key: string]: unknown;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ICustomQueryOptions<T> extends Omit<
  UseQueryOptions<T, AxiosError<IErrorResponse>, T, QueryKey>,
  'queryKey' | 'queryFn'
> {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ICustomMutationOptions<
  TData,
  TError = AxiosError<IErrorResponse>,
  TVariables = unknown,
  TContext = unknown,
> extends Partial<UseMutationOptions<TData, TError, TVariables, TContext>> {}
