import { FaPlus } from "react-icons/fa6";
import img from "../assets/image/react.png";
import Navbarcomp from "@/components/navbar_comp";
import Popupcomp from "@/components/popup_comp";
import { useState } from "react";

const Dashbord = () => {
  const [showPopup, setShowPopup] = useState(false);

  // Show popup for 2 seconds when triggered
  const handleShowPopup = () => {
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 30000);
  };

  return (
    <div className="bg-black h-screen relative">
      <Navbarcomp />
      <div className="px-72 py-4 flex  gap-10">
        <div
          className="border-2 border-[#424242] rounded-xl border-dashed p-6 flex flex-col items-center gap-5 cursor-pointer bg-white/5 w-80 hover:bg-white/10 h-96 justify-center"
          onClick={handleShowPopup}
        >
          <FaPlus className="text-white" size={60} />
        </div>
        <div
          className="relative border-2 border-[#424242] rounded-xl border-dashed flex flex-col items-center gap-5  w-80 h-96 justify-center"
          
        >
          <img
            src={img}
            alt=""
            className="w-full rounded-xl h-full relative "
          />
          <div className="absolute inset-0 flex flex-col justify-between">
            <button className="bg-white/20 rounded-full p-2 cursor-pointer ">
              <FaPlus className="text-white " size={16} />
            </button>
            <div className="bg-white/20 text-white rounded-b-xl px-4 py-2">
              <p>uwefuwehfe</p>
              <p>eufweufweuf</p>
            </div>
          </div>
        </div>
      </div>
      {showPopup && <Popupcomp onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default Dashbord;
