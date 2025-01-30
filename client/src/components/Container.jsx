import React from "react";

const Container = ({ children }) => {
  return (
    <>
      <div className="md:container mx-auto w-full md:w-4/5 lg:w-3/5">
        {children}
      </div>
    </>
  );
};

export default Container;
