import { useState, useEffect } from "react";
import { useParams, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useGetAllPermission } from "@/services/permission.service";
import {
  useRoleDetails,
  useUpdateRolePermission,
} from "@/services/role.service";
import type {
  IRolePermissionResponse,
  IUpdateRolePermissionPayload,
} from "@/interface/role.interface";
import type { IGetAllPermissionResponse } from "@/interface/permission.interface";
import { Switch } from "@/components/ui/switch";
import { Spinner } from "@/components/ui/spinner";
import { Badge } from "@/components/ui/badge";

const EditRolePermission = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id: roleId } = useParams({ strict: false });
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const { data: roleData, isLoading: isLoadingRole } = useRoleDetails(
    roleId ?? "",
  );

  const { data: permissions, isLoading: isLoadingPermissions } =
    useGetAllPermission();

  const {
    mutateAsync: updateRolePermissionMutate,
    isPending: isUpdatePending,
  } = useUpdateRolePermission({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getRoleDetails", roleId] });
      queryClient.invalidateQueries({ queryKey: ["getAllRoleWithPermission"] });
      navigate({ to: "/role-permissions" });
    },
  });

  useEffect(() => {
    if (roleData?.permission) {
      const initialSelected = roleData.permission.map(
        (item: IRolePermissionResponse) => item.id,
      );
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedPermissions(initialSelected);
    }
  }, [roleData]);

  const handleTogglePermission = (permissionId: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(permissionId)
        ? prev.filter((id) => id !== permissionId)
        : [...prev, permissionId],
    );
  };

  const handleUpdatePermissions = async () => {
    if (!roleId) return;
    const payload: IUpdateRolePermissionPayload = {
      permission_id_list: selectedPermissions,
    };
    await updateRolePermissionMutate({
      roleId,
      payload,
    });
  };

  if (isLoadingRole || isLoadingPermissions) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-white">
        <Spinner className="size-16" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl p-6 mt-10">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <p className="text-2xl font-bold">Manage Permissions</p>
          <Badge className="px-4 py-2 text-lg bg-[#577c8e]">
            {roleData?.name}
          </Badge>
          <p className="text-2xl font-bold">Role</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {permissions?.map((permission: IGetAllPermissionResponse) => (
          <div
            key={permission.id}
            className="flex flex-row items-center justify-between rounded-lg border p-4 gap-6"
          >
            <div className="space-y-0.5">
              <Label
                htmlFor={permission.id}
                className="text-base font-medium cursor-pointer"
              >
                {permission.name}
              </Label>
              <p className="text-sm text-zinc-500">{permission.description}</p>
            </div>
            <Switch
              id={permission.id}
              checked={selectedPermissions.includes(permission.id)}
              onCheckedChange={() => handleTogglePermission(permission.id)}
              className="cursor-pointer"
            />
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center gap-4 pt-4">
        <Button
          variant="outline"
          onClick={() => navigate({ to: "/role-permissions" })}
          className="w-30 hover:bg-[#c8d9e5] cursor-pointer"
        >
          Back
        </Button>
        <Button onClick={handleUpdatePermissions} disabled={isUpdatePending} className="w-30 bg-[#2f4157] cursor-pointer">
          {isUpdatePending && <Spinner />}
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default EditRolePermission;
