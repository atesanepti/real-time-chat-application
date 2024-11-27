import React, { useEffect, useState } from "react";
import { clearNotification } from "../redux/features/notificationM";
import { MdError } from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
const Notification = () => {
  const { variant, message } = useSelector((state) => state.notificationMR);

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(clearNotification());
  };

  useEffect(() => {
    if (variant) {
      setTimeout(() => {
        dispatch(clearNotification());
      }, [4000]);
    }
  }, [variant, dispatch]);

  //  const now = new Date();
  //  const timeLength = 4000;
  // const [time, setTime] = useState(timeLength);
  // const [stopTimer, setStopTimer] = useState(false);
  // const [currentTime, setCurrentTime] = useState(0);
  // const [lastTime, setLastTime] = useState(0);
  // const [timerId, setTimerId] = useState(0);
  // const handleTimerStop = () => {
  //   setStopTimer(true);
  //   setCurrentTime(now.getSeconds());

  // };

  // const handleTimerStart = () => {
  //   setStopTimer(false);
  //   setLastTime(now.getSeconds());
  // };

  // useEffect(() => {
  //   if (variant && !stopTimer) {
  //     let timerId = setTimeout(() => {
  //       dispatch(clearNotification());
  //     }, time);
  //     setTimerId(timerId);
  //   }

  //   if (stopTimer) {
  //     clearTimeout(timerId);
  //   }
  // }, [variant, dispatch, stopTimer, time]);

  // useEffect(() => {
  //   if (lastTime > 0) {
  //     console.log("current", currentTime);
  //     console.log("lastTime", lastTime);
  //     setTime(timeLength - (currentTime - lastTime));
  //   }
  // }, [lastTime]);

  const style =
    "w-[280px] cursor-default z-[5] overflow-hidden shadow-lg sm:w-[300px] md:w-[320px] lg:w-[380px] fixed top-6 left-1/2  bg-dark-surface p-3 lg:p-4 rounded-xl flex items-center gap-2 lg:gap-3";

  const Text = (
    <div className="flex-1">
      <h5
        className={`text-xs ${
          variant == "error" ? "text-[#db3939]" : "text-[#1e966e]"
        } lg:text-sm font-medium `}
      >
        {message?.title || "New Notification"}
      </h5>
      <span className="max-w-[85%] !line-clamp-1 lg:!line-clamp-none block text-[10px] lg:text-xs text-gray-light">
        {message?.content}
      </span>
    </div>
  );
  const CloseBtn = (
    <button
      onClick={handleClose}
      className="absolute top-1/2   translate-y-[-50%] cursor-pointer right-5"
    >
      <IoIosClose className="text-gray-deep text-3xl" />
    </button>
  );
  if (variant == "error") {
    return (
      <div id="notification" className={`${style}`}>
        <MdError className="text-xl lg:text-3xl  p-1 text-[#ee5c5c]  rounded-md bg-[#c7272d1a] " />
        {Text}
        {CloseBtn}
      </div>
    );
  } else if (variant == "success") {
    return (
      <div id="notification" className={` ${style}`}>
        <MdError className="text-xl lg:text-3xl p-1 text-[#5effc9] rounded-md  bg-[#14805c] " />
        {Text}
        {CloseBtn}
      </div>
    );
  }
};

export default Notification;
