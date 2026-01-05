import {
  // QueryKey,
  UseMutationResult,
  keepPreviousData,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { apiInstance } from "./axiosConfig";
import { AxiosError, AxiosResponse } from "axios";
import {
  ApiResponseError,
  ApiResponseSuccess,
  QueryMethod,
} from "@/src/lib/types";

export const useReactQuery = <T>(
  queryKey: string[],
  path: string,
  enabled: boolean = true
) => {
  return useQuery<
    AxiosResponse<ApiResponseSuccess<T>>,
    AxiosError<ApiResponseError>
  >({
    queryKey,
    queryFn: () => apiInstance.get<ApiResponseSuccess<T>>(path),
    placeholderData: keepPreviousData,
    enabled: enabled,
  });
};

export const useReactMutation = <T, U>(
  path: string,
  method: QueryMethod = "post"
): UseMutationResult<
  AxiosResponse<ApiResponseSuccess<T>>,
  AxiosError<ApiResponseError>,
  U
> => {
  return useMutation<
    AxiosResponse<ApiResponseSuccess<T>>,
    AxiosError<ApiResponseError>,
    U
  >({
    mutationFn: (data: U) => {
      return apiInstance[method]<ApiResponseSuccess<T>>(path, data);
    },
  });
};

