import type { IProfileResponse } from "@/interface/profile.interface";
import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await api.get<IProfileResponse>(`/auth/profile`);
      return response.data;
    },
  });
};
