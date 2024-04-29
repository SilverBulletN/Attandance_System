import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="flex">
      <div className="w-1/2 bg-[#8ed1fc] p-10 text-white flex flex-col  justify-between">
        <div>
          <h2 className="text-2xl font-bold">COMPANY LOGO</h2>
          <h1 className="mt-10 text-6xl font-bold">Welcome to...</h1>
          <p className="mt-4 text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <p>Lorem ipsum dolor sit amet</p>
      </div>
      <div className="w-1/2 bg-white p-10 flex flex-col justify-center">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-2">Login</h2>
          <p className="mb-10 text-sm">
            Welcome! Login to get amazing discounts and offers only for you.
          </p>
          <form>
            <div className="flex flex-col space-y-4 mb-4">
              <Input placeholder="User Name" type="text" />
              <Input placeholder="Password" type="password" />
            </div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember-me" />
                <Label className="text-sm" htmlFor="remember-me">
                  Remember me
                </Label>
              </div>
              <Link className="text-sm text-[#8ed1fc]" to="#">
                Forgot your password?
              </Link>
            </div>
            <Button className="w-full bg-[#8ed1fc] text-white">LOGIN</Button>
            <div className="flex justify-between items-center mt-4 text-sm">
              <p>
                New User?{" "}
                <Link className="text-[#8ed1fc]" to="#">
                  Signup
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
