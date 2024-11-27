import React, { useState } from "react";
import { CiCircleInfo } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
const Message = ({ variant, children }) => {
  let styles;
  switch (variant) {
    case "info":
      styles = "bg-[#4feb8b13]";
  }
  const [close, setClose] = useState(false);

  const closeMessageBox = () => {
    setClose(true);
  };

  return (
    <div
      className={`${styles} relative text-[10px] md:text-xs text-white  bg-[#4feb8b13]  w-[330px] sm:w-[350px] md:w-[400px] lg:w-[500px] my-7 md:my-9 lg:my-14  px-2 md:px-3 lg:px-4 py-2 md:py-3 lg:py-5 flex items-center gap-3 lg:gap-6 ${
        close ? "hidden" : "flex"
      }`}
    >
      <CiCircleInfo className="text-white text-lg lg:text-xl" />
      <span className="max-w-[80%] text-white text-[10px] lg:text-xs">{children}</span>

      <button
        className="absolute top-1/2 right-5 translate-y-[-50%] border-none cursor-pointer"
        onClick={closeMessageBox}
      >
        <RxCross2 className="text-white text-xs lg:text-sm " />
      </button>
    </div>
  );
};

export default Message;
