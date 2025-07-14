import {
  useRef,
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
} from "react";
import { uploadToImgbb } from "../lib/utlis";

interface ImageUploaderProps {
  image: string;
  setImage: Dispatch<SetStateAction<string>>;
}

const Imageuploder = ({ image, setImage }: ImageUploaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClearImage = () => {
    setImage("");
  };

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
      <p className="mb-2 font-bold text-xl">Select Your Profile Picture</p>
      <div onClick={handleonClick}>
        {image ? (
          <div className="border-2 border-indigo-600 border-dashed p-10 flex flex-col items-center gap-5 cursor-pointer">
            <button
              onClick={handleClearImage}
              className="flex items-end justify-end w-full"
            >
              X
            </button>

            <img src={image} alt="" className="h-32" />
          </div>
        ) : (
          <div className="border-2 border-indigo-600 border-dashed p-10 flex flex-col items-center gap-5 cursor-pointer">
            <span className="font-semibold text-lg text-indigo-600">
              Drag & Drop
            </span>
            <fieldset className="flex w-full items-center justify-center border-t text-indigo-600">
              <legend className="px-5 text-center font-light text-sm text-indigo-600">
                or
              </legend>
            </fieldset>
            <span className="font-semibold text-lg text-indigo-600">
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
