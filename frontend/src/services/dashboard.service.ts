import type { IDashboardResponse } from "@/interface/dashboard.interface";
import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetDashboard = () => {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      const response = await api.get<IDashboardResponse>(`/dashboard`);
      return response.data;
    },
  });
};
