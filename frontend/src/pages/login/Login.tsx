import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import type {
  ILoginFormValues,
  ILoginPayload,
} from "@/interface/login.interface";
import { useLogin } from "@/services/auth.service";
import { useNavigate } from "@tanstack/react-router";
import { TriangleAlert } from "lucide-react";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormValues>();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const { mutateAsync: loginMutate, isPending: isLoginPending } = useLogin({
    onSuccess: (response) => {
      localStorage.setItem("access_token", response.access_token);
      navigate({
        to: "/dashboard",
      });
    },
    onError: (error) => {
      if (error.response?.status === 401) {
        setErrorMessage("Username and Password Mismatch, Please Try Again");
      }
    },
  });

  const onSubmit: SubmitHandler<ILoginFormValues> = async (data) => {
    const payload: ILoginPayload = {
      username: data.username,
      password: data.password,
    };
    await loginMutate(payload);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col justify-center items-center gap-6 h-screen">
        <h1 className="text-4xl font-extrabold tracking-tight text-balance">
          Login
        </h1>

        {errorMessage && (
          <div className="flex items-center border rounded-xl p-2 px-6 gap-2 bg-red-200 border-red-700 text-red-700">
            <TriangleAlert size={20} /> {errorMessage}
          </div>
        )}
        <div className="bg-[#c8d9e5] flex flex-col gap-4 p-20 rounded-2xl w-130">
          <div className="w-full flex flex-col gap-2">
            <p className="font-semibold">Username *</p>
            <div>
              <Input
                id="username"
                type="text"
                placeholder="Please enter username"
                {...register("username", { required: "Username required" })}
                className="bg-white"
              />
              {errors.username && (
                <p className="text-xs mt-1 text-red-700">
                  {errors.username.message as string}
                </p>
              )}
            </div>
          </div>
          <div className="w-full flex flex-col gap-2">
            <p className="font-semibold">Password *</p>
            <div>
              <Input
                id="password"
                type="text"
                placeholder="Please enter password"
                {...register("password", { required: "Password required" })}
                className="bg-white"
              />
              {errors.password && (
                <p className="text-xs mt-1 text-red-700">
                  {errors.password.message as string}
                </p>
              )}
            </div>
          </div>
        </div>
        <Button
          type="submit"
          variant="outline"
          size="lg"
          className="hover:bg-[#2f4157] hover:text-white font-extrabold border-2"
          disabled={isLoginPending}
        >
          {isLoginPending && <Spinner data-icon="inline-start" />}
          Confirm
        </Button>
      </div>
    </form>
  );
};

export default Login;
