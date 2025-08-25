import { useSelector } from "react-redux";

import { CiLogout } from "react-icons/ci";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaPlus } from "react-icons/fa6";
import { useState } from "react";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { ModeToggle } from "../mode-toggle";
import Popupcomp from "../popup_comp";
import { Separator } from "@radix-ui/react-separator";
import type { RootState } from "@/store";
import { Button } from "../ui/button";

const Navbar = () => {
  const handleShowPopup = () => {
    setShowPopup(true);
  };
  const [showPopup, setShowPopup] = useState(false);
  const { logout } = useKindeAuth();

  const { userdata } = useSelector((state: RootState) => state.global);
  return (
    <div className="w-full px-7 shadow h-16 items-center justify-end flex">
      <div className="flex items-center gap-3">
        <Button
          variant={"default"}
          size={"icon"}
          className="bg-white/20 p-1.5 rounded-xl  lg:hidden"
          onClick={handleShowPopup}
        >
          <FaPlus size={20} className="text-primary" />
        </Button>

        <div className="flex gap-2.5">
          <ModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <img
                src={userdata?.profile_picture || "https://ui.shadcn.com/avatars/04.png"}
                alt="https://ui.shadcn.com/avatars/04.png"
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
                  <p className="text-[12px] text-gray-400">{userdata.email}</p>
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

export default Navbar;
