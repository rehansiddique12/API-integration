import { useState } from "react";
import { Toaster, toast } from "sonner";
import { Link } from "react-router-dom";
import { LuLoader } from "react-icons/lu";
import { useNavigate } from "react-router";
import { FaTelegramPlane } from "react-icons/fa";
import ImageUploader from "../copmponents/image-uploder";
import { useRegisterApiMutation } from "../store/services/user";

const SignupPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [register, {isLoading}] = useRegisterApiMutation();
  const [password, setPassword] = useState("");
  const [lestname, setLestname] = useState("");
  

  const handleSubmit = async () => {
    const payload = {
      first_name: name,
      email: email,
      password: password,
      last_name: lestname,
      profile_picture: image,
    };
    const respon = await register(payload);
    console.log(respon);
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
  return (
    <div className="bg-gradient-to-r from-[#1a5193] to-indigo-500 h-screen">
      <Toaster position="top-right" richColors />
      <div className=" h-full flex flex-col items-center justify-center gap-5">
        <p className="text-3xl font-bold text-white">REGISTER FORM</p>
        <div className="w-1/2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="bg-white rounded-xl flex flex-col p-10 w-full border-l-8 border-indigo-600 duration-500 hover:shadow-xl"
          >
            <div className="flex w-full gap-10">
              <div className="flex flex-col w-full">
                <label htmlFor="" className="mb-2 mt-3 font-bold text-xl">
              First_Name:
            </label>
            <input
              type="name"
              placeholder="Enter Your First_Name"
              className="bg-black/20 p-3 rounded-xl outline-none px-5 focus:border focus:border-indigo-600"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
              </div>
            <div className="flex flex-col w-full">
              <label htmlFor="" className="mb-2 mt-3 font-bold text-xl">
              Last_Name:
            </label>
            <input
              type="name"
              placeholder="Enter Your Last_Name"
              className="bg-black/20 p-3 rounded-xl outline-none px-5 focus:border focus:border-indigo-600"
              value={lestname}
              onChange={(e) => setLestname(e.target.value)}
              required
            />
            </div>
            </div>
            <label htmlFor="" className="mb-2 mt-3 font-bold text-xl">
              Email:
            </label>
            <input
              type="email"
              placeholder="Enter Your Email"
              className="bg-black/20 p-3 rounded-xl outline-none px-5 focus:border focus:border-indigo-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="" className="mb-2 mt-3 font-bold text-xl">
              Password:
            </label>
            <input
              type="password"
              placeholder="Enter Your Password"
              className="bg-black/20 p-3 rounded-xl outline-none px-5 focus:border focus:border-indigo-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="mt-3">
              <ImageUploader image={image} setImage={setImage} />
            </div>
            <div className="flex justify-end gap-3 w-full mt-10">
              <button
              disabled={isLoading}
                type="submit"
                className="flex items-center justify-center gap-2 bg-gradient-to-r px-8 py-3 w-full rounded-lg cursor-pointer text-white font-bold from-[#1a5193] to-indigo-500"
              >
                 {isLoading ?
                  <LuLoader size={20} color="#FFFFFF" className="animate-spin" />
                  :
                  <div className="flex justify-center items-center gap-2">
                    <FaTelegramPlane />
                    Register
                  </div>
                  }
                
              </button>
            </div>
            <p className="text-end mt-4 mr-r">
              Already have an account?
              <Link
                to={"/login"}
                className="underline underline-offset-4 text-indigo-500 font-bold text-lg ml-1"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
