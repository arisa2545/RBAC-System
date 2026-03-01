import { PermissionEnum } from "@/enum/permission";
import usePermission from "@/hooks/usePermission";
import { useGetProfile } from "@/services/profile.service";

const Dashboard = () => {
  const { data: profile } = useGetProfile();
  const { hasPermission } = usePermission();

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex flex-col gap-4">
        <p className="text-5xl font-extrabold">
          Welcome, {profile?.first_name} {profile?.last_name}{" "}
        </p>
        {hasPermission(PermissionEnum.VIEW_DASHBOARD) && (
          <div className="flex gap-4">
            <div className="border w-fit rounded-xl p-6 text-center">
              <p>Total User</p>
              <p className="font-bold text-2xl">10</p>
            </div>
            <div className="border w-fit rounded-xl p-6 text-center">
              <p>Total Role</p>
              <p className="font-bold text-2xl">3</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
