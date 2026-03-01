import { useParams, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useGetUserDetails } from "@/services/user.service";
import usePermission from "@/hooks/usePermission";
import { PermissionEnum } from "@/enum/permission";

const UserDetails = () => {
  const navigate = useNavigate();
  const { hasPermission } = usePermission();
  const { id: userId } = useParams({ strict: false });

  const { data: userDetails, isLoading: isLoadingUserDetails } =
    useGetUserDetails(userId ?? "");

  if (isLoadingUserDetails) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-white">
        <Spinner className="size-16" />
      </div>
    );
  }

  return (
    <div className="mx-auto p-6 mt-10 w-200">
      <p className="text-4xl font-extrabold mb-4">User Details</p>
      <div className="flex flex-col gap-2 border rounded-xl p-6">
        <div className="flex text-lg gap-2">
          <p className="font-semibold">First Name: </p>
          <p>{userDetails?.first_name}</p>
        </div>
        <div className="flex text-lg gap-2">
          <p className="font-semibold">Last Name: </p>
          <p>{userDetails?.last_name}</p>
        </div>
        <div className="flex text-lg gap-2">
          <p className="font-semibold">Role: </p>
          <p>{userDetails?.role}</p>
        </div>
        <div className="flex text-lg gap-2">
          <p className="font-semibold">Username: </p>
          <p>{userDetails?.username}</p>
        </div>
        <div className="flex text-lg gap-2">
          <p className="font-semibold">Email: </p>
          <p>{userDetails?.email}</p>
        </div>
        <div className="flex text-lg gap-2">
          <p className="font-semibold">Phone: </p>
          <p>{userDetails?.phone}</p>
        </div>
      </div>
      <div className="mt-8 flex justify-center gap-4 pt-2">
        <Button
          variant="outline"
          onClick={() => navigate({ to: "/users" })}
          className="w-30 hover:bg-[#c8d9e5] cursor-pointer"
        >
          Back
        </Button>
        <Button
          onClick={() => navigate({ to: `/users/edit/${userDetails?.id}` })}
          className="w-30 bg-[#2f4157] cursor-pointer"
          disabled={!hasPermission(PermissionEnum.EDIT_USER_INFO)}
        >
          Edit
        </Button>
      </div>
    </div>
  );
};

export default UserDetails;
