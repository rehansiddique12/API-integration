import { useDispatch, useSelector } from "react-redux";
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
import { setToken } from "@/store/slices/global";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import Popupcomp from "./popup_comp";
import { useState } from "react";

const Navbarcomp = () => {
  
  const handleShowPopup = () => {
    setShowPopup(true);
  };
  
  const [selectedItem, setSelectedITem] = useState<Items>();
  const [showPopup, setShowPopup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const handleLogout = () => {
    dispatch(setToken(null));
    localStorage.clear();
    navigate("/login"); 
  };
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
            <FaPlus size={20} className="text-white"/>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <img
                src={userdata.profile_picture}
                alt=""
                className="h-8 w-8 rounded-full cursor-pointer"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-32 mt-2">
              <DropdownMenuCheckboxItem
                className="text-white hover:text-red-400 cursor-pointer"
                onClick={handleLogout}
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
      {showPopup && selectedItem && (
        <Popupcomp
          onClose={() => {
            setShowPopup(false);
            setSelectedITem(undefined);
          }}
          editData={selectedItem}
        />
      )}
    </div>
  );
};

export default Navbarcomp;
