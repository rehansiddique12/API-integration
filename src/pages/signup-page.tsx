import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import { Link } from "react-router-dom";
import { LuLoader } from "react-icons/lu";
import { useNavigate } from "react-router";
import { FaTelegramPlane } from "react-icons/fa";
import Imageuploder from "../components/image-uploder";
import { useRegisterApiMutation } from "../store/services/auth";
import { useDispatch } from "react-redux";
import { setToken } from "../store/slices/global";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const SignupPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [lestname, setLestname] = useState("");
  const [register, { isLoading }] = useRegisterApiMutation();

  const handleSubmit = async () => {
    const payload = {
      first_name: name,
      email: email,
      password: password,
      last_name: lestname,
      profile_picture: image,
    };
    const respon = await register(payload);
    if (respon.data.data) {
      toast.success(respon.data.message || "Signup successful!");
      void navigate("/");
    } else {
      toast.error(respon?.data?.message || "Signup failed. Please try again.");
    }
    setPassword("");
    setEmail("");
    setName("");
    setLestname("");
  };

  useEffect(() => {
    dispatch(setToken(null));
    localStorage.clear();
    // console.log("Token after remove:", localStorage.getItem("token"));
  }, []);

  return (
    <div className="bg-black h-screen">
      <Toaster position="top-right" richColors />
      <div className=" h-full flex flex-col items-center justify-center">
        <div className="w-[450px] flex items-center justify-center">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="bg-[#181818] rounded-xl flex flex-col px-5 py-2 w-full h-[750px] border-2 border-[#2b2b2b] gap-5"
          >
            <div className="text-white">
              <div>
                <p className="text-xl font-bold text-white mt-4">REGISTER</p>
                <p className="font-bold text-sm text-[#8d8d8d]">
                  Enter your details to get started.
                </p>
                <Separator className="my-4" />
              </div>
              <div className="flex flex-col w-full text-sm">
                <label htmlFor="" className="mb-2 font-bold text-[#e5e5e5]">
                  First_Name:
                </label>
                <Input
                  type="name"
                  placeholder="Enter Your First_Name"
                  className="bg-white/5"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col w-full text-sm">
                <label
                  htmlFor=""
                  className="mb-2 mt-4 font-bold text-[#e5e5e5]"
                >
                  Last_Name:
                </label>
                <Input
                  type="name"
                  placeholder="Enter Your Last_Name"
                  className="bg-white/5"
                  value={lestname}
                  onChange={(e) => setLestname(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col w-full text-sm">
                <label
                  htmlFor=""
                  className="mb-2 mt-4 font-bold text-[#e5e5e5]"
                >
                  Email:
                </label>
                <Input
                  type="email"
                  placeholder="exanple@gmail.com"
                  className="bg-white/5"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col w-full text-sm">
                <label
                  htmlFor=""
                  className="mb-2 mt-4 font-bold text-[#e5e5e5]"
                >
                  Password:
                </label>
                <Input
                  type="password"
                  placeholder="Enter Your Password"
                  className="bg-white/5"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="">
              <Imageuploder image={image} setImage={setImage} />

              <div className="flex justify-end gap-3 w-full mt-2">
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
                      Register
                    </div>
                  )}
                </button>
              </div>
              <p className="text-center mt-4 text-[#e5e5e5] text-[12px]">
                Already have an account?
                <Link
                  to={"/login"}
                  className="underline underline-offset-4 text-[#e5e5e5] font-bold text-sm ml-1"
                >
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;




