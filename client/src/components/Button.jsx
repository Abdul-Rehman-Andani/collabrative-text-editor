import React from "react";

const Button = ({label, full}) => {
  return (
    <button
      className={`${full && "w-full"} p-3 bg-blue-600 text-white py-2 rounded-lg cursor-pointer`}
    >
      {label}
    </button>
  );
};

export default Button;
