import React from "react";

const Input = ({ name, type, label, placeholder, value, handleInput , disable}) => {
  return (
    <div className="relative mb-5">
      <label htmlFor={label}>{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        className="w-full p-2 mt-1 border border-gray-300 rounded-lg peer  focus:outline-none focus:ring-2 focus:ring-blue-600"
        onChange={handleInput}
        disabled={disable && disable}
      />
    </div>
  );
};

export default Input;
