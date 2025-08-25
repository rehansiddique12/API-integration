import {
  useRef,
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
} from "react";
import { uploadToImgbb } from "../lib/utils";

interface ImageUploaderProps {
  image: string;
  setImage: Dispatch<SetStateAction<string>>;
}

const Imageuploder = ({ image, setImage }: ImageUploaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  

  const handleonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handeImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const resImageURL = await uploadToImgbb(file);
      setImage(resImageURL);
    }
  };
  return (
    <div>
      <p className="mb-2 mt-4 font-bold text-sm text-primary">Select Your Profile Picture :</p>
      <div onClick={handleonClick}>
        {image ? (
          <div className="border-2 border-[#424242] rounded-xl border-dashed p-6 flex flex-col items-center gap-5 cursor-pointer bg-white/5">

            <img src={image} alt="" className="h-32" />
          </div>
        ) : (
          <div className="border-2 border-[#424242] rounded-xl border-dashed p-6 flex flex-col items-center gap-5 cursor-pointer bg-white/5">
            <span className="font-semibold text-lg text-primary">
              Drag & Drop
            </span>
            <fieldset className="flex w-full items-center justify-center border-t border-[#424242]">
              <legend className="px-5 text-center font-light text-sm text-primary">
                or
              </legend>
            </fieldset>
            <span className="font-semibold text-lg text-primary">
              Click to Upload an Image
            </span>
          </div>
        )}
        <input
          type="file"
          ref={inputRef}
          onChange={handeImageChange}
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
};

export default Imageuploder;
