import { useSelector } from "react-redux";
import type { RootState } from "../store";
import logo from "../assets/image/react.png";
import { Separator } from "./ui/separator";
import { CiLogout } from "react-icons/ci";
import MaxWidthWrapper from "./max-width-wrapper";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaPlus } from "react-icons/fa6";
import Popupcomp from "./popup_comp";
import { useState } from "react";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

const Navbarcomp = () => {
  const handleShowPopup = () => {
    setShowPopup(true);
  };

  const [showPopup, setShowPopup] = useState(false);

  const { logout } = useKindeAuth();
  
  const { userdata } = useSelector((state: RootState) => state.global);
  return (
    <div className="">
      <MaxWidthWrapper>
        <div className="py-3 flex justify-between items-center">
          <img src={logo} alt="" className="h-10 cursor-pointer" />
          <div className="flex items-center gap-3">
            <div
              className="bg-white/20 p-1.5 rounded-xl  lg:hidden"
              onClick={handleShowPopup}
            >
              <FaPlus size={20} className="text-white" />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <img
                  src={userdata.profile_picture}
                  alt=""
                  className="h-8 w-8 rounded-full cursor-pointer"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mt-2 -ml-17">
                <DropdownMenuCheckboxItem>
                  <div>
                    <p className="text-[14px] font-bold text-white">
                      {userdata.first_name}
                      {userdata.last_name}
                    </p>
                    <p className="text-[12px] text-gray-400">
                      {userdata.email}
                    </p>
                  </div>
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  className="text-white hover:text-red-400 cursor-pointer"
                  onClick={() => logout()}
                >
                  <CiLogout className="text-red-400" />
                  Logout
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </MaxWidthWrapper>
      <Separator className="" />
      {showPopup && (
        <Popupcomp
          onClose={() => {
            setShowPopup(false);
          }}
        />
      )}
    </div>
  );
};

export default Navbarcomp;
