import { Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { CircleUserRound, LogOut } from "lucide-react";
import { Badge } from "../ui/badge";
import { useQuery } from "@tanstack/react-query";
import type { IProfileResponse } from "@/interface/profile.interface";

export default function Navbar() {
  const navigate = useNavigate();
  const navigateItemClassName =
    "text-xs font-medium text-[#577c8e] hover:text-zinc-900 [&.active]:font-bold [&.active]:text-[#2f4157] [&.active]:underline";

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("profile")
    navigate({ to: "/login" });
  };

  const { data: profile } = useQuery<IProfileResponse>({ queryKey: ['profile'] });

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between bg-[#c8d9e5] px-6 py-4 shadow-xs">
      <div className="flex items-center gap-8">
        <h1 className="text-xl font-bold text-[#2f4157]">
          Secured RBAC Dashboard
        </h1>

        <div className="flex gap-6 mt-0.5">
          <Link to="/dashboard" className={navigateItemClassName}>
            HOME
          </Link>
          <Link to="/" className={navigateItemClassName}>
            USER
          </Link>
          <Link to="/" className={navigateItemClassName}>
            ROLE & PERMISSION
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex gap-2 items-center font-medium text-[#2f4157]">
          <CircleUserRound size={36} absoluteStrokeWidth={true} />
          <div className="flex flex-col">
            <p className="text-sm">{profile?.first_name} {profile?.last_name}</p>
           <Badge variant="secondary" className="text-[9px] text-[#577c8e]">{profile?.role}</Badge>
          </div>
        </div>
        <Button onClick={handleLogout} variant="outline" size="sm">
          <LogOut />
        </Button>
      </div>
    </nav>
  );
}
