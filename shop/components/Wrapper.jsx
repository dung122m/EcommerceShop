import React from "react";

const Wrapper = ({ children }) => {
  return (
    <div
      className={`w-full max-w-[1280px] px-5 md:px-10 mx-auto || ""
      }`}
    >
      {children}
    </div>
  );
};

export default Wrapper;
