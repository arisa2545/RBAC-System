import { Button } from "@/components/ui/button";
import { PermissionEnum } from "@/enum/permission";
import usePermission from "@/hooks/usePermission";
import { useGetDashboard } from "@/services/dashboard.service";
import { useGetProfile } from "@/services/profile.service";
import { useNavigate } from "@tanstack/react-router";
import { SquareArrowOutUpRight } from "lucide-react";
import homeImage from "@/assets/home.jpg";

const Dashboard = () => {
  const navigate = useNavigate();
  const { hasPermission } = usePermission();
  const { data: profile } = useGetProfile();
  const { data: dashboard } = useGetDashboard();

  const handleRedirectToUser = () => navigate({ to: "/users" });
  const handleRedirectToRolePermission = () =>
    navigate({ to: "/role-permissions" });

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex justify-between items-center h-screen">
        <div className="flex flex-col gap-4">
          <p className="text-5xl font-extrabold">
            Welcome, {profile?.first_name ?? ""} {profile?.last_name ?? ""}
          </p>
          {hasPermission(PermissionEnum.VIEW_DASHBOARD) && (
            <div className="flex gap-4">
              <div className="border w-fit rounded-xl p-6 text-center">
                <p>Total User</p>
                <p className="font-bold text-2xl">
                  {dashboard?.total_user ?? 0}
                </p>
              </div>
              <div className="border w-fit rounded-xl p-6 text-center">
                <p>Total Role</p>
                <p className="font-bold text-2xl">
                  {dashboard?.total_role ?? 0}
                </p>
              </div>
              <div className="border w-fit rounded-xl p-6 text-center">
                <p>Total Permission</p>
                <p className="font-bold text-2xl">
                  {dashboard?.total_permission ?? 0}
                </p>
              </div>
            </div>
          )}
          {hasPermission(PermissionEnum.VIEW_USER) && (
            <Button
              className="text-[#2f4157] font-bold bg-[#c8d9e5] w-fit hover:bg-[#577c8e] hover:text-white rounded-3xl cursor-pointer"
              onClick={handleRedirectToUser}
            >
              <div className="flex gap-3 mx-6 items-center">
                VIEW ALL USER
                <SquareArrowOutUpRight />
              </div>
            </Button>
          )}
          {hasPermission(PermissionEnum.VIEW_ROLE_PERMISSION) && (
            <Button
              className="text-[#2f4157] font-bold bg-[#c8d9e5] w-fit hover:bg-[#577c8e] hover:text-white rounded-3xl cursor-pointer"
              onClick={handleRedirectToRolePermission}
            >
              <div className="flex gap-3 mx-6 items-center">
                VIEW ALL ROLE & PERMISSION
                <SquareArrowOutUpRight />
              </div>
            </Button>
          )}
        </div>
        <div>
          <img
            src={homeImage}
            alt="Welcome Banner"
            className="mb-8 h-100 w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
