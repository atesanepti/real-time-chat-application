import React, { useEffect, useState } from "react";
import {IoIosClose} from "react-icons/io"
const Model = ({ children, isVisiable, onClose }) => {
  const [isShow, setShow] = useState(false);

  const handleCloseModel = () => {
    setShow(false);
    if (onClose) {
      onClose();
    }
  };

  useEffect(() => {
    if (isVisiable) {
      setShow(true);
    }
  }, [isVisiable]);

  return (
    <>
      {isShow && (
        <div
          onClick={(e) => {
            if (e.target.matches("#model_box")) {
              handleCloseModel();
            }
          }}
          id="model_box"
          className="fixed z-[2] top-0 left-0 w-full h-screen flex items-center justify-center overflow-hidden bg-[#00000041]"
        >
          <div className="relative w-[270px] sm:w-[280px] md:w-[300px] lg:w-[320px] bg-dark-surface rounded-2xl p-3 lg:p-6">
            {children}
          </div>
          <button
            onClick={handleCloseModel}
            className="absolute top-4 right-4 cursor-pointer"
          >
            <IoIosClose className="text-white text-2xl lg:text-3xl" />
          </button>
        </div>
      )}
    </>
  );
};

export default Model;
