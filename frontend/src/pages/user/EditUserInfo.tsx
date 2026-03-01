import { useEffect } from "react";
import { useParams, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGetUserDetails, useUpdateUserInfo } from "@/services/user.service";
import { useGetAllRole } from "@/services/role.service";
import type { IGetAllRoleResponse } from "@/interface/role.interface";
import { Spinner } from "@/components/ui/spinner";

export interface UpdateUserFormData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  role_id: string;
}

const EditUserInfo = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id: userId } = useParams({ strict: false });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateUserFormData>();

  const { data: userDetails, isLoading: isLoadingUser } = useGetUserDetails(
    userId ?? "",
  );

  const { data: roles, isLoading: isLoadingRoles } = useGetAllRole();

  const { mutateAsync: updateUserMutate, isPending: isUpdateUserPending } =
    useUpdateUserInfo({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["userList"] });
        queryClient.invalidateQueries({ queryKey: ["userDetails", userId] });
        navigate({ to: "/users" });
      },
    });

  useEffect(() => {
    if (userDetails) {
      reset({
        first_name: userDetails.first_name,
        last_name: userDetails.last_name,
        phone: userDetails.phone,
        email: userDetails.email,
        role_id: userDetails.role_id,
      });
    }
  }, [userDetails, reset]);

  const onSubmit: SubmitHandler<UpdateUserFormData> = async (data) => {
    if (!userId) return;
    await updateUserMutate({
      userId,
      payload: data,
    });
  };

  if (isLoadingUser || isLoadingRoles) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-white">
        <Spinner className="size-16" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl p-6 mt-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-4xl font-bold">Edit User Information</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="first_name" className="font-bold">
                First Name
              </Label>
              <Input
                id="first_name"
                {...register("first_name", {
                  required: "Please enter first name",
                })}
                className={errors.first_name ? "border-red-700" : ""}
              />
              {errors.first_name && (
                <p className="text-xs text-red-700">
                  {errors.first_name.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="last_name" className="font-bold">
                Last Name
              </Label>
              <Input
                id="last_name"
                {...register("last_name", {
                  required: "Please enter last name",
                })}
                className={errors.last_name ? "border-red-700" : ""}
              />
              {errors.last_name && (
                <p className="text-xs text-red-700">
                  {errors.last_name.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="font-bold">
                Phone
              </Label>
              <Input
                id="phone"
                {...register("phone", { required: "Please enter phone" })}
                className={errors.first_name ? "border-red-700" : ""}
              />
              {errors.phone && (
                <p className="text-xs text-red-700">{errors.phone.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="font-bold">
                email
              </Label>
              <Input
                id="email"
                {...register("email", { required: "Please enter email" })}
                className={errors.first_name ? "border-red-700" : ""}
              />
              {errors.email && (
                <p className="text-xs text-red-700">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="role_id" className="font-bold">
                Role
              </Label>
              <select
                id="role_id"
                {...register("role_id", { required: "Please select role" })}
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {roles?.map((role: IGetAllRoleResponse) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
              {errors.role_id && (
                <p className="text-xs text-red-700">{errors.role_id.message}</p>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-center pt-2 gap-4">
          <Button
            variant="outline"
            onClick={() => navigate({ to: "/users" })}
            className="w-30 hover:bg-[#c8d9e5] cursor-pointer"
          >
            Back
          </Button>
          <Button
            type="submit"
            disabled={isUpdateUserPending}
            className="w-30 bg-[#2f4157] cursor-pointer"
          >
            {isUpdateUserPending && <Spinner />}
            Confirm
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditUserInfo;
