import { useSelector } from "react-redux";
import type { RootState } from "../store";
import logo from "../assets/image/react.png";
import { Separator } from "./ui/separator";

const Navbarcomp = () => {
  const { userdata } = useSelector((state: RootState) => state.global);
  return (
    <div className="">
      <div className="px-72 py-4  flex justify-between items-center">
        <img src={logo} alt="" className="h-10 cursor-pointer" />
        <img
          src={userdata.profile_picture}
          alt=""
          className="h-10 w-10 rounded-full cursor-pointer"
        />
      </div>
      <Separator className="" />
    </div>
  );
};

export default Navbarcomp;
