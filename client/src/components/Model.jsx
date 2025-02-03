import { IoMdClose } from "react-icons/io";

const Model = ({children, close}) => {

  const handleModel = () => {
    close();
  }
  return (
    <div className='w-full z-50 h-screen fixed left-0 top-0 bg-[rgba(0,0,0,0.6)] flex justify-center items-center'>
        <span className='absolute right-5 top-5 text-white text-2xl cursor-pointer'>
        <IoMdClose onClick={handleModel}/>
        </span>
        {children}
    </div>
  )
}

export default Model;