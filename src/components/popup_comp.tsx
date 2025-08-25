import "./popup_comp.css";
import { toast, Toaster } from "sonner";
import { Textarea } from "./ui/textarea";
import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Imageuploder from "../components/image-uploder";
import {
  useEditItemMutation,
  usePostItemsMutation,
} from "@/store/services/crud";
import { LuLoader } from "react-icons/lu";

interface PopupcompProps {
  onClose: () => void;
  editData?: Items;
}

const Popupcomp = ({ onClose, editData }: PopupcompProps) => {
  const [postItem, { isLoading }] = usePostItemsMutation();
  const [editItem, { isLoading: isEditing }] = useEditItemMutation();

  const [id, setId] = useState<number>();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (editData) {
      setId(editData.id);
      setName(editData.name);
      setDescription(editData.description);
      setImage(editData.image_url);
    }
  }, [editData]);

  const handleSubmit = async () => {
    if (!name.trim() || !description.trim() || !image.trim()) {
      toast.error("Please fill in all fields including image.");
      return;
    }

    if (editData) {
      try {
        const res = await editItem({
          id: id!,
          data: { name, description, image_url: image },
        });
        console.log(res);
        if ("data" in res) {
          toast.success("Item edited successfully!");
          onClose();
          setId(undefined);
          setName("");
          setDescription("");
          setImage("");
        } else {
          toast.error("Failed to edit item.");
          console.error(res.error);
        }
      } catch (err) {
        toast.error("Something went wrong.");
        console.error(err);
      }
    } else {
      try {
        const res = await postItem({ name, description, image_url: image });

        if ("data" in res) {
          toast.success("Item created successfully!");
          onClose();
          setName("");
          setDescription("");
          setImage("");
        } else {
          toast.error("Failed to create item.");
          console.error(res.error);
        }
      } catch (err) {
        toast.error("Something went wrong.");
        console.error(err);
      }
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[70] flex items-center justify-center">
      <Toaster position="top-right" richColors />

      <div className="w-[400px] md:w-[450px] slide-up">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="border-2 border-[#2b2b2b] text-primary rounded-xl px-5 py-4 flex flex-col"
        >
          <div className="flex justify-end">
            <IoClose
              className="text-white text-xl cursor-pointer"
              onClick={handleClose}
            />
          </div>

          <div>
            <p className="text-xl font-bold">Add an Item</p>
            <p className="text-sm text-primary font-medium">
              Add your favorite items here.
            </p>
            <Separator className="my-4" />
          </div>

          <div className="flex flex-col text-sm">
            <label className="mb-1 font-bold text-primary">Item Name:</label>
            <Input
              type="text"
              placeholder="Enter item name"
              className="bg-white/5"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex flex-col text-sm mt-4">
            <label className="mb-2 font-bold text-primary">
              Item Description:
            </label>
            <Textarea
              placeholder="Enter item description"
              className="resize-none h-32 text-primary"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <Imageuploder image={image} setImage={setImage} />

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              className="border text-primary px-6 py-2 rounded-lg w-full"
              onClick={handleClose}
            >
              Close
            </button>
            <button
              type="submit"
              className="border text-primary px-6 py-2 rounded-lg w-full font-bold cursor-pointer flex items-center justify-center"
            >
              {isLoading || isEditing ? (
                <LuLoader size={20} color="#000" className="animate-spin" />
              ) : editData ? (
                "Edit"
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Popupcomp;
