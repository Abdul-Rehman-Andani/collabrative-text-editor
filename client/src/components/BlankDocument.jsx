import { RiAddLargeLine } from "react-icons/ri";
import useHomeModelStore from "../hooks/useHomeModelStore";

const BlankDocument = () => {
  const { openHomeModel } = useHomeModelStore();

  const handleModel = () => {
    openHomeModel();
  };

  return (
    <>
      <div
        onClick={handleModel}
        className="py-20 cursor-pointer text-3xl text-gray-500 border rounded border-gray-200 flex justify-center items-center bg-white w-35"
      >
        <RiAddLargeLine />
      </div>
      <span className="p-1 text-[14px]">Black Document</span>
    </>
  );
};

export default BlankDocument;
