import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";
import Popupcomp from "@/components/popup_comp";
import { Button } from "@/components/ui/button";
import { TbDotsVertical } from "react-icons/tb";
import { LuTriangleAlert } from "react-icons/lu";
import Navbarcomp from "@/components/navbar_comp";
import { RiDeleteBin7Line } from "react-icons/ri";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { useDeleteItemMutation, useGetItemsQuery } from "@/store/services/crud";

const Dashboard = () => {
  const { data } = useGetItemsQuery();
  const [showPopup, setShowPopup] = useState(false);
  const [selectedItem, setSelectedITem] = useState<Items>();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const [deleteItem] = useDeleteItemMutation();

  const handleShowPopup = () => {
    setShowPopup(true);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;

    const response = await deleteItem(deleteId);
    if (response) {
      console.log(response);
    } else {
      console.log("error");
    }
    setShowDeletePopup(false);
    setDeleteId(null);
  };

  return (
    <div className="bg-black min-h-screen relative text-white">
      <Navbarcomp />
      <MaxWidthWrapper>
        <div className="flex justify-center items-center">
          <div className="py-6 grid lg:grid-cols-4 md:grid-cols-2 gap-5">
            {data?.length ? (
              data.map((item) => (
                <div
                  key={item.id}
                  className="relative w-76 h-94 rounded-xl overflow-hidden flex flex-col group"
                >
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex flex-col justify-between">
                    <div className="flex justify-end p-2 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300">
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
                            onClick={() => {
                              setDeleteId(item.id.toString());
                              setShowDeletePopup(true);
                            }}
                          >
                            <RiDeleteBin7Line className="text-[#8d8d8d]" />
                            Delete Item
                          </DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="bg-[#262626]/90 text-white px-4 py-4 rounded-b-xl">
                      <div>
                        <p className="font-bold text-xl line-clamp-2">
                          {item.name}
                        </p>
                        <p className="text-sm text-gray-400 line-clamp-1">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 mt-10">Data is Loading . . .</p>
            )}

            <div
              className="hidden lg:flex border-2 border-[#424242] rounded-xl border-dashed p-6 items-center gap-5 cursor-pointer bg-white/5 w-72 h-94 hover:bg-white/10 justify-center transition"
              onClick={handleShowPopup}
            >
              <FaPlus size={60} />
            </div>
          </div>
        </div>
      </MaxWidthWrapper>

      {showPopup && (
        <Popupcomp
          onClose={() => {
            setShowPopup(false);
            setSelectedITem(undefined);
          }}
          editData={selectedItem}
        />
      )}

      {showDeletePopup && (
        <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center">
          <div className="bg-black p-9 rounded-xl text-white w-full max-w-sm shadow-xl flex flex-col items-center justify-center border border-[#424242]">
            <div className="bg-[#3b1c1d] p-3 mb-4 rounded-full flex items-center justify-center">
              <LuTriangleAlert className="size-16 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold mb-4">Are you sure?</h2>
            <p className="mb-6 text-center">
              Do you really want to delete this item? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-4">
              <Button
                className="text-black cursor-pointer"
                variant="outline"
                onClick={() => {
                  setShowDeletePopup(false);
                  setDeleteId(null);
                }}
              >
                Close
              </Button>
              <Button
                variant="destructive"
                onClick={confirmDelete}
                className="cursor-pointer"
              >
                Sure
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
