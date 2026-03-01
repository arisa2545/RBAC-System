import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PermissionEnum } from "@/enum/permission";
import usePermission from "@/hooks/usePermission";
import { useGetProfile } from "@/services/profile.service";
import { CircleUserRound } from "lucide-react";

const Profile = () => {
  const { data: profile } = useGetProfile();
  const { hasPermission } = usePermission();

  return (
    <div className="flex flex-col h-screen items-center mt-12">
      <div className="w-162.5 flex flex-col gap-6">
        <p className="text-4xl font-extrabold">Profile</p>
        <div className="flex border rounded-xl p-8 gap-12 items-center justify-center">
          <CircleUserRound size={200} absoluteStrokeWidth={true} />
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <p className="text-2xl font-extrabold">
                {profile?.first_name} {profile?.last_name}
              </p>
              <Badge
                variant="secondary"
                className="text-[14px] text-white bg-[#577c8e] px-4"
              >
                {profile?.role}
              </Badge>
            </div>
            <div className="text-md">
              <span className="font-bold">Username:</span> {profile?.username}
            </div>
            <div className="text-md">
              <span className="font-bold">Email:</span> {profile?.email}
            </div>
            <div className="text-md">
              <span className="font-bold">Phone:</span> {profile?.phone}
            </div>
            <div className="flex flex-wrap gap-2">
              {profile?.permissions.map((permission) => {
                return (
                  <Badge className="text-[9px] bg-[#c8d9e5] text-[#577c8e] font-semibold">
                    {permission}
                  </Badge>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button className="bg-red-700 hover:bg-red-600 cursor-pointer" disabled={!hasPermission(PermissionEnum.CAN_DELETE)}>
            Delete My Account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
