import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PermissionEnum } from "@/enum/permission";
import usePermission from "@/hooks/usePermission";
import { useGetAllUser } from "@/services/user.service";
import { Notebook, SquarePen } from "lucide-react";

const UserList = () => {
  const { data: userList = [] } = useGetAllUser();
  const { hasPermission } = usePermission();

  return (
    <div className="flex flex-col h-screen items-center mt-12">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <p className="text-4xl font-extrabold">User List</p>
        </div>
        <div className="flex flex-col gap-6 w-125">
          {userList.map((user) => {
            return (
              <div className="flex justify-between border rounded-lg p-4">
                <div>
                  <div className="text-xl font-bold">
                    {user.first_name} {user.last_name}
                  </div>
                  <div className="text-sm font-semibold">{user.email}</div>
                  <Badge className="bg-[#c8d9e5] text-#577c8e px-4">
                    {user.role}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="xs"
                    className="bg-[#577c8e] hover:bg-[#2f4157] cursor-pointer"
                    disabled={!hasPermission(PermissionEnum.VIEW_USER)}
                  >
                    <div className="flex items-center gap-1 px-1">
                      Details
                      <Notebook />
                    </div>
                  </Button>
                  <Button
                    size="xs"
                    className="bg-[#577c8e] hover:bg-[#2f4157] cursor-pointer"
                    disabled={!hasPermission(PermissionEnum.EDIT_USER_INFO)}
                  >
                    <div className="flex items-center gap-1 px-1">
                      Edit
                      <SquarePen />
                    </div>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UserList;
