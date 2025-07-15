import "./popup_comp.css";
import { useState } from "react";
import { Toaster } from "sonner";
import { Textarea } from "./ui/textarea";
import { IoClose } from "react-icons/io5";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Imageuploder from "../components/image-uploder";

interface PopupcompProps {
  onClose: () => void;
}

const Popupcomp = ({ onClose }: PopupcompProps) => {
  const [image, setImage] = useState("");

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="bg-transparent backdrop-blur-[2px] z-[70] h-screen absolute w-full top-0">
      <Toaster position="top-right" richColors />
      <div className="h-full flex flex-col items-center justify-center">
        <div className="w-[450px] flex items-center justify-center">
          <div className="w-full">
            <div>
              <form
                // onSubmit={(e) => {
                //   e.preventDefault();
                //   handleSubmit();
                // }}
                className="bg-black rounded-xl flex flex-col px-5 py-2 w-full border-2 border-[#2b2b2b] gap-5"
              >
                <div>
                  <button onClick={handleClose} className="flex justify-end items-end w-full">
                    <IoClose
                      className="text-white text-xl cursor-pointer"
                      
                    />
                  </button>
                  <div>
                    <p className="text-xl font-bold text-white mt-4">
                      Add an Item
                    </p>
                    <p className="font-bold text-sm text-[#8d8d8d]">
                      Add your favorite items here.
                    </p>
                    <Separator className="my-4" />
                  </div>
                  <div className="flex flex-col w-full text-sm">
                    <label htmlFor="" className="mb-2 font-bold text-[#e5e5e5]">
                      Item Name:
                    </label>
                    <Input
                      type="name"
                      placeholder="Enter Your First_Name "
                      className="bg-white/5 py-5"
                    />
                  </div>
                  <div className="flex flex-col w-full text-sm">
                    <label
                      htmlFor=""
                      className="mb-2 mt-4 font-bold text-[#e5e5e5]"
                    >
                      Item Description:
                    </label>
                    <Textarea
                      placeholder="Enter Your Last_Name"
                      className="bg-white/5 resize-none mt-0 h-30"
                      required
                    />
                  </div>
                </div>
                <div className="">
                  <Imageuploder image={image} setImage={setImage} />
                  <div className="flex justify-end gap-3 w-full mt-2 mb-2">
                    <button
                      type="button"
                      className="flex items-center justify-center gap-2 bg-white/20 px-8 py-2 w-full rounded-lg cursor-pointer font-bold mt-3 text-white"
                      onClick={handleClose}
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      className="flex items-center justify-center gap-2 bg-[#e5e5e5] px-8 py-2 w-full rounded-lg cursor-pointer font-bold mt-3"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popupcomp;
