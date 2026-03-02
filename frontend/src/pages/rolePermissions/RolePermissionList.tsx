import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PermissionEnum } from "@/enum/permission";
import usePermission from "@/hooks/usePermission";
import { useRoleWithPermission } from "@/services/role.service";
import { useNavigate } from "@tanstack/react-router";
import { SquarePen } from "lucide-react";

const RolePermissionList = () => {
  const { data: roleList = [] } = useRoleWithPermission();
  const navigate = useNavigate();
  const { hasPermission } = usePermission()
  const handleRedirectEditPage = (roleId: string) => {
    navigate({ to: `/role-permissions/edit/${roleId}` });
  };

  return (
    <div className="flex flex-col h-screen items-center mt-12">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <p className="text-4xl font-extrabold">Role & Permission List</p>
        </div>
        <div className="flex flex-col gap-6 w-160">
          {roleList.map((role) => {
            return (
              <div className="flex justify-between border rounded-lg p-5 gap-8">
                <div>
                  <div className="text-lg font-bold">{role.name}</div>
                  <div className="text-[13px]">{role.description}</div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {role.permission.map((permission) => {
                      return (
                        <Badge className="text-[9px] bg-[#c8d9e5] text-[#577c8e] font-semibold">
                          {permission.name}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
                <Button
                  size="xs"
                  className="bg-[#577c8e] hover:bg-[#2f4157] cursor-pointer"
                  onClick={() => handleRedirectEditPage(role.id)}
                  disabled={!hasPermission(PermissionEnum.MANAGE_ROLE_PERMISSION)}
                >
                  Edit Permissions <SquarePen />
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RolePermissionList;
