import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { useLoginApiMutation } from "../store/services/user";
import { LuLoader } from "react-icons/lu";

const Loginpage = () => {
  const navigate = useNavigate();
  const [Login, {isLoading}] = useLoginApiMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  return (
    <div className="bg-gradient-to-r from-[#1a5193] to-indigo-500 h-screen">
      <Toaster position="top-right" richColors />
      <div className=" h-full flex flex-col items-center justify-center gap-5">
        <p className="text-3xl font-bold text-white">LOGIN FORM</p>
        <div className="w-1/2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="bg-white rounded-xl flex flex-col p-10 w-full border-l-8 border-indigo-600 duration-500 hover:shadow-xl"
          >
            <label htmlFor="" className="mb-2 font-bold text-xl">
              Email:
            </label>
            <input
              type="email"
              placeholder="Enter Your Email"
              className="bg-black/20 p-2 rounded-xl outline-none px-5 focus:border focus:border-indigo-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="" className="mb-2 font-bold text-xl mt-4">
              Password:
            </label>
            <input
              type="password"
              placeholder="Enter Your Password"
              className="bg-black/20 p-2 rounded-xl outline-none px-5 focus:border focus:border-indigo-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="flex justify-end gap-3 w-full mt-10">
              <button
              disabled={isLoading}
                type="submit"
                className="bg-gradient-to-r px-8 py-2 w-full rounded-lg cursor-pointer text-white font-bold from-[#1a5193] to-indigo-500"
              >
                 {isLoading ?
                  <LuLoader size={20} color="#FFFFFF" className="animate-spin" />
                  :
                  "Login"
                  }
              </button>
            </div>
            <p className="text-end mt-4 mr-2">
              Don't have an account?
              <Link
                to={"/register"}
                className="underline underline-offset-4 text-indigo-500 font-bold text-lg"
              >
                SignUp
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;
