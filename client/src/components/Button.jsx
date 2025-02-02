import React from "react";

const Button = ({ label, full, children }) => {
  return (
    <button
      className={`${
        full && "w-full"
      } p-3 bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg cursor-pointer`}
    >
      <span className="flex items-center gap-2">
        {label}
        {children}
      </span>
    </button>
  );
};

export default Button;
