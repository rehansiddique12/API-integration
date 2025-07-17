import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin7Line } from "react-icons/ri";
import { TbDotsVertical } from "react-icons/tb";

import Navbarcomp from "@/components/navbar_comp";
import Popupcomp from "@/components/popup_comp";
import { useDeleteItemMutation, useGetItemsQuery } from "@/store/services/crud";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import MaxWidthWrapper from "@/components/max-width-wrapper";

const Dashboard = () => {
  const { data } = useGetItemsQuery();
  const [showPopup, setShowPopup] = useState(false);

  const [deleteItem] = useDeleteItemMutation();
  const handleDelete = async (id: string) => {
    const respons = await deleteItem(id);
    if (respons) {
      console.log(respons);
    } else {
      console.log("error");
    }
  };

  const [selectedItem, setSelectedITem] = useState<Items>();

  const handleShowPopup = () => {
    setShowPopup(true);
  };

  return (
    <div className="bg-black min-h-screen relative text-white">
      <Navbarcomp />
      <MaxWidthWrapper>
        <div className="px-4 sm:px-10 lg:px-60 py-6 flex flex-wrap gap-6">
          {data?.length ? (
            data.map((item) => (
              <div
                key={item.id}
                className="relative w-76 h-90 rounded-xl overflow-hidden flex flex-col group"
              >
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex flex-col justify-between">
                  <div className="flex justify-end p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="text-black cursor-pointer"
                        >
                          <TbDotsVertical />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-32">
                        <DropdownMenuCheckboxItem
                          className="text-white cursor-pointer"
                          onClick={() => {
                            setSelectedITem(item);
                            setShowPopup(true);
                          }}
                        >
                          <FiEdit className="text-[#8d8d8d]" />
                          Edit Item
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          className="text-red-500 mt-2 hover:text-white cursor-pointer"
                          onClick={() => handleDelete(item.id)}
                        >
                          <RiDeleteBin7Line className="text-[#8d8d8d]" />
                          Delete Item
                        </DropdownMenuCheckboxItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="bg-[#262626]/90 text-white px-4 py-4 rounded-b-xl">
                    <div>
                    <p className="font-bold text-xl line-clamp-2">{item.name}</p>
                    <p className="text-sm text-gray-400 line-clamp-1">{item.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 mt-10">Data is Loading . . .</p>
          )}

          <div
            className="border-2 border-[#424242] rounded-xl border-dashed p-6 flex flex-col items-center gap-5 cursor-pointer bg-white/5 w-72 h-90  hover:bg-white/10  justify-center transition"
            onClick={handleShowPopup}
          >
            <FaPlus size={60} />
          </div>
        </div>
      </MaxWidthWrapper>

      {showPopup && (
        <Popupcomp
          onClose={() => {
            setShowPopup(false);
            setSelectedITem();
          }}
          editData={selectedItem}
        />
      )}
    </div>
  );
};

export default Dashboard;
