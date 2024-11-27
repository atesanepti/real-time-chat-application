import React from "react";
import Loader from "./Loader";

const Button = ({
  style = "",
  isLoading,
  children,
  type = "button",
  onClick,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading || disabled}
      type={type}
      className={`flex items-center justify-center w-max rounded-full disabled:cursor-not-allowed h-[35px] lg:h-[40px] bg-green-deep disabled:opacity-75 px-4 md:px-5 lg:px-6 text-white cursor-pointer text-xs md:text-sm ${style}`}
    >
      {isLoading ? <Loader /> : children}
    </button>
  );
};

export default Button;
