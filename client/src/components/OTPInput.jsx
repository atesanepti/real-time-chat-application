import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { Link } from 'react-router-dom';

const OTPInput = ({ buttonContent, onSend, onError, isLoading }) => {
  const [form, setForm] = useState({
    "in-1": "",
    "in-2": "",
    "in-3": "",
    "in-4": "",
    "in-5": "",
  });

  const handleFormChange = (e) => {
    const { value, name } = e.target;
    setForm((prev) => {
      if (prev[name].length < 1) {
        return { ...prev, [name]: value.toString() };
      }
      return { ...prev };
    });
  };

  const [error, setError] = useState(false);
  const [selectedInput, setSelectedInput] = useState(null);
  const in_1 = useRef();
  const in_2 = useRef();
  const in_3 = useRef();
  const in_4 = useRef();
  const in_5 = useRef();
  const handleSelectedInput = (e, name) => {
    const code = "Digit" + e.key;
    if (code == e.code) {
      if (name == in_1) {
        setSelectedInput(in_2);
      } else if (name == in_2) {
        setSelectedInput(in_3);
      } else if (name == in_3) {
        setSelectedInput(in_4);
      } else if (name == in_4) {
        setSelectedInput(in_5);
      } else {
        setSelectedInput(null);
      }
    }
  };

  useEffect(() => {
    const ele = [in_1, in_2, in_3, in_4, in_5];
    ele.forEach((e) => {
      if (selectedInput == e) {
        e.current.focus();
      }
    });
  }, [selectedInput]);

  const handleVerify = () => {
    let code = "";
    for (let key in form) {
      code += form[key];
    }

    onSend(+code);
  };

  useEffect(() => {
    setError(onError);
  }, [onError]);

  return (
    <div className=" w-[250px] sm:w-[300px] md:w-[320px]  mx-auto">
      <div className="w-full flex gap-2 md:gap-3  items-center justify-between">
        <input
          onKeyUp={(e) => handleSelectedInput(e, in_1)}
          ref={in_1}
          className={`w-[40px] h-[40px] text-center md:w-[45px] md:h-[45px] lg:w-[50px]  lg:h-[50px]   bg-transparent outline-none border-2  text-xs lg:text-sm text-white  rounded-full ${
            error
              ? "border-red-600 focus:border-red-600"
              : "border-gray-deep focus:border-green-hard"
          }`}
          type="number"
          max={1}
          name="in-1"
          value={form["in-1"]}
          onChange={handleFormChange}
        />
        <input
          onKeyUp={(e) => handleSelectedInput(e, in_2)}
          ref={in_2}
          className={`w-[40px] h-[40px] text-center md:w-[45px] md:h-[45px] lg:w-[50px]  lg:h-[50px] bg-transparent outline-none border-2  text-xs lg:text-sm text-white  rounded-full ${
            error
              ? "border-red-600 focus:border-red-600"
              : "border-gray-deep focus:border-green-hard"
          }`}
          type="number"
          max={1}
          name="in-2"
          value={form["in-2"]}
          onChange={handleFormChange}
        />
        <input
          onKeyUp={(e) => handleSelectedInput(e, in_3)}
          ref={in_3}
          className={`w-[40px] h-[40px] text-center md:w-[45px] md:h-[45px] lg:w-[50px]  lg:h-[50px] bg-transparent outline-none border-2  text-xs lg:text-sm text-white  rounded-full ${
            error
              ? "border-red-600 focus:border-red-600"
              : "border-gray-deep focus:border-green-hard"
          }`}
          type="number"
          max={1}
          name="in-3"
          value={form["in-3"]}
          onChange={handleFormChange}
        />
        <input
          onKeyUp={(e) => handleSelectedInput(e, in_4)}
          ref={in_4}
          className={`w-[40px] h-[40px] text-center md:w-[45px] md:h-[45px] lg:w-[50px]  lg:h-[50px] bg-transparent outline-none border-2  text-xs lg:text-sm text-white  rounded-full ${
            error
              ? "border-red-600 focus:border-red-600"
              : "border-gray-deep focus:border-green-hard"
          }`}
          type="number"
          max={1}
          name="in-4"
          value={form["in-4"]}
          onChange={handleFormChange}
        />
        <input
          onKeyUp={(e) => handleSelectedInput(e, in_5)}
          ref={in_5}
          className={`w-[40px] h-[40px] text-center md:w-[45px] md:h-[45px] lg:w-[50px]  lg:h-[50px] bg-transparent outline-none border-2  text-xs lg:text-sm text-white  rounded-full ${
            error
              ? "border-red-600 focus:border-red-600"
              : "border-gray-deep focus:border-green-hard"
          }`}
          type="number"
          max={1}
          name="in-5"
          value={form["in-5"]}
          onChange={handleFormChange}
        />
      </div>

      <div className="flex items-center justify-between">
        <span className="my-3 md:my-5 block text-xs lg:text-sm text-red-600">
          {error}
        </span>
        <button
          className="text-white font-medium lg:font-semibold text-xs lg:text-sm"
          onClick={() =>
            setForm({
              "in-1": "",
              "in-2": "",
              "in-3": "",
              "in-4": "",
              "in-5": "",
            })
          }
        >
          Clear-
        </button>
      </div>

      <Button
        isLoading={isLoading}
        onClick={handleVerify}
        style="!w-full jus my-5 lg:my-6 md:my-7"
      >
        {buttonContent}
      </Button>
    </div>
  );
};

export default OTPInput;
