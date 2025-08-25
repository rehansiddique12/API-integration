import { toast, Toaster } from "sonner";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { LuLoader } from "react-icons/lu";
import { useEffect, useState } from "react";
import { Input } from "../components/ui/input";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";
import { setToken } from "../store/slices/global";
import firebase from "../assets/image/firebase.png";
import { Link, useNavigate } from "react-router-dom";
import { Separator } from "../components/ui/separator";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { useLoginApiMutation } from "../store/services/auth";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { ModeToggle } from "@/components/mode-toggle";

const Loginpage = () => {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const provider = new GoogleAuthProvider();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [Login, { isLoading }] = useLoginApiMutation();

  const handleSubmit = async () => {
    const payload = {
      email: email,
      password: password,
    };
    const respon = await Login(payload);
    console.log(respon);
    if (respon.data.data) {
      toast.success(respon.data.message || "Login successful!");
      void navigate("/Dashbord");
    } else {
      toast.error(respon?.data?.message || "Login failed. Please try again.");
    }

    setPassword("");
    setEmail("");
  };

  useEffect(() => {
    dispatch(setToken(null));
    localStorage.clear();
  },);

  const { login } = useKindeAuth();

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen w-full">
      <div className="absolute top-5 right-5">
          <ModeToggle />
        </div>
      <Toaster position="top-right" richColors />
      <div className=" h-full flex flex-col items-center justify-center gap-5">
        <div className="w-[450px]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="bg rounded-xl flex flex-col px-5 py-2 w-full border-2 text-white"
          >
            <div>
              <p className="text-xl font-bold text-primary mt-4">LOGIN</p>
              <p className="font-bold text-sm text-primary">
                Enter your details to get started.
              </p>
              <Separator className="my-4" />
            </div>
            <div className="pb-3 gap-3 flex justify-center">
              <button
                onClick={() =>
                  login({
                    connectionId: "conn_0198bd2c9c099c26a45f2cbb6d89f65b",
                  })
                }
                type="button"
                className="px-4 p-2 text-primary border border-gray-400 rounded-md bg-white/10 cursor-pointer flex justify-center items-center gap-2 hover:bg-white/20"
              >
                <FcGoogle />
                Login With Google
              </button>

              <button
                onClick={() => handleGoogleLogin()}
                type="button"
                className="px-4 p-2 text-primary border border-gray-400 rounded-md bg-white/10 cursor-pointer flex justify-center items-center gap-2 hover:bg-white/20"
              >
                <img src={firebase} alt="" className="h-5" />
                Login With FireBase
              </button>
            </div>
            <div className="flex flex-col w-full text-sm">
              <label htmlFor="" className="mb-2 font-bold text-primary">
                Email:
              </label>
              <Input
                type="email"
                placeholder="Enter Your Email"
                className="bg-white/5 "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col w-full text-sm">
              <label htmlFor="" className="mb-2 mt-3 font-bold text-primary">
                Password:
              </label>
              <div className="relative w-full">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Your Password"
                  className="bg-white/5 pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-primary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <MdOutlineRemoveRedEye className="w-5 h-5" />
                  ) : (
                    <FaRegEyeSlash className="w-5 h-5" />
                  )}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-3 mt-2">
              <button
                disabled={isLoading}
                type="submit"
                className="flex items-center justify-center gap-2 bg-[#e5e5e5] px-8 py-2 w-full rounded-lg cursor-pointer font-bold mt-3"
              >
                {isLoading ? (
                  <LuLoader size={20} color="#000" className="animate-spin" />
                ) : (
                  <div className="flex justify-center items-center gap-2 text-black">
                    <FaTelegramPlane />
                    Login
                  </div>
                )}
              </button>

              <p className="text-center mb-2 text-primary text-[12px]">
                Don't have an account?
                <Link
                  to={"/register"}
                  className="underline underline-offset-4 text-primary font-bold text-sm ml-1"
                >
                  SignUp
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;
