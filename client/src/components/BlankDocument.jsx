import { RiAddLargeLine } from "react-icons/ri";
import useModelStore from "../hooks/useModelStore";

const BlankDocument = () => {

  const {openModel} = useModelStore();

  const handleModel = () => {
    openModel();
  }

  return (
    <>
      <div onClick={handleModel} className="py-20 cursor-pointer text-3xl text-gray-500 border rounded border-gray-200 flex justify-center items-center bg-white w-35">
        <RiAddLargeLine />
      </div>
      <span className="p-1 text-[14px]">Black Document</span>
    </>
  );
};

export default BlankDocument;
