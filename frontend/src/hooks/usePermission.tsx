import type { PermissionEnum } from "@/enum/permission";
import { useGetProfile } from "@/services/profile.service";

export default function usePermission() {
  const { data: profile } = useGetProfile();

  const hasPermission = (requiredPermission: PermissionEnum) => {
    return profile?.permissions.includes(requiredPermission);
  };

  return { hasPermission };
}
