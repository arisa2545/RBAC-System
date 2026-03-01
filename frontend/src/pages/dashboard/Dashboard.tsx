import { PermissionEnum } from "@/enum/permission";
import usePermission from "@/hooks/usePermission";
import { useGetDashboard } from "@/services/dashboard.service";
import { useGetProfile } from "@/services/profile.service";

const Dashboard = () => {
  const { data: profile } = useGetProfile();
  const { hasPermission } = usePermission();
  const { data: dashboard } = useGetDashboard();

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex flex-col gap-4">
        <p className="text-5xl font-extrabold">
          Welcome, {profile?.first_name ?? ''} {profile?.last_name ?? ''}
        </p>
        {hasPermission(PermissionEnum.VIEW_DASHBOARD) && (
          <div className="flex gap-4">
            <div className="border w-fit rounded-xl p-6 text-center">
              <p>Total User</p>
              <p className="font-bold text-2xl">{dashboard?.total_user ?? 0}</p>
            </div>
            <div className="border w-fit rounded-xl p-6 text-center">
              <p>Total Role</p>
              <p className="font-bold text-2xl">{dashboard?.total_role ?? 0}</p>
            </div>
            <div className="border w-fit rounded-xl p-6 text-center">
              <p>Total Permission</p>
              <p className="font-bold text-2xl">{dashboard?.total_permission ?? 0}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
