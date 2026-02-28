import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Login = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-6 h-screen">
      <h1 className="text-4xl font-extrabold tracking-tight text-balance">
        Login
      </h1>
      <div className="bg-[#c8d9e5] flex flex-col gap-4 p-20 rounded-2xl w-130">
        <div className="w-full flex flex-col gap-2">
          <p className="font-semibold">Username</p>
          <Input
            id="username"
            type="text"
            placeholder="Please enter username"
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <p className="font-semibold">Password</p>
          <Input
            id="password"
            type="text"
            placeholder="Please enter password"
          />
        </div>
      </div>
      <Button
        variant="outline"
        size="lg"
        className="hover:bg-[#577c8e] hover:text-white font-extrabold border-2"
      >
        Confirm
      </Button>
    </div>
  );
};

export default Login;
