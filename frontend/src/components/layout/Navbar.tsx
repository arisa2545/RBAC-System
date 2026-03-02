import { Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { CircleUserRound, LogOut } from "lucide-react";
import { Badge } from "../ui/badge";
import { Spinner } from "../ui/spinner";
import { useGetProfile } from "@/services/profile.service";
import { useEffect } from "react";
import usePermission from "@/hooks/usePermission";
import { PermissionEnum } from "@/enum/permission";
import { useDisclosure } from "@/hooks/useDisclosure";
import ConfirmLogoutModal from "../ConfirmLogoutModal";

export default function Navbar() {
  const navigate = useNavigate();
  const { hasPermission } = usePermission();
  const navigateItemClassName =
    "text-xs font-medium text-[#577c8e] hover:text-zinc-900 [&.active]:font-bold [&.active]:text-[#2f4157] [&.active]:underline";

  const [
    isConfirmLogoutOpen,
    { close: closeConfirmLogout, open: openConfirmLogout },
  ] = useDisclosure();

  const { data: profile, isLoading } = useGetProfile();

  useEffect(() => {
    if (profile) {
      localStorage.setItem("profile", JSON.stringify(profile));
    }
  }, [profile]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-white">
        <Spinner className="size-16" />
      </div>
    );
  }

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between bg-[#c8d9e5] px-6 py-4 shadow-xs">
      <div className="flex items-center gap-8">
        <h1 className="text-xl font-bold text-[#2f4157]">
          Secured RBAC Dashboard
        </h1>

        <div className="flex gap-6 mt-0.5">
          {hasPermission(PermissionEnum.VIEW_DASHBOARD) && (
            <Link to="/dashboard" className={navigateItemClassName}>
              HOME
            </Link>
          )}
          {hasPermission(PermissionEnum.VIEW_USER) && (
            <Link to="/users" className={navigateItemClassName}>
              USER
            </Link>
          )}
          {hasPermission(PermissionEnum.VIEW_ROLE_PERMISSION) && (
            <Link to="/role-permissions" className={navigateItemClassName}>
              ROLE & PERMISSION
            </Link>
          )}
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div
          className="flex gap-2 items-center font-medium text-[#2f4157] cursor-pointer"
          onClick={() => navigate({ to: "/profile" })}
        >
          <CircleUserRound size={36} absoluteStrokeWidth={true} />
          <div className="flex flex-col">
            <p className="text-sm">
              {profile?.first_name} {profile?.last_name}
            </p>
            <Badge
              variant="secondary"
              className="text-[9px] text-[#577c8e] cursor-pointer"
            >
              {profile?.role}
            </Badge>
          </div>
        </div>
        <Button
          onClick={openConfirmLogout}
          variant="outline"
          size="sm"
          className="cursor-pointer"
        >
          <LogOut />
        </Button>
      </div>
      {isConfirmLogoutOpen && (
        <ConfirmLogoutModal
          isOpen={isConfirmLogoutOpen}
          onClose={closeConfirmLogout}
        />
      )}
    </nav>
  );
}
