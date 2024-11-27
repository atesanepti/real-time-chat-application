import React from "react";

const ProfileLoader = () => {
  return (
    <div className="w-full h-screen">
      <div className="flex items-center justify-end p-3 lg:p-5">
        <div className="w-[120px] h-[40px] bg-dark-surface"></div>
      </div>
      <div className="flex items-center flex-col p-3 lg:p-5">
        <div className="w-[60px] lg:w-[80px] h-[60px] lg:h-[80px] rounded-full bg-dark-surface"></div>
        <div className="w-[100px] my-2 lg:my-3 h-[34px] bg-dark-surface"></div>
      </div>
      <div className="flex justify-between items-center p-3 lg:p-5 ">
        <div className="w-[65px] lg:w-[80px] h-[30px] rounded-md lg:h-[35px] bg-dark-surface">
          {" "}
        </div>
        <div className="w-[65px] lg:w-[40px] h-[30px] rounded-md lg:h-[35px] bg-dark-surface"></div>
      </div>
      <div className="flex justify-between items-center p-3 lg:p-5 ">
        <div className="w-[65px] lg:w-[80px] h-[30px] rounded-md lg:h-[35px] bg-dark-surface">
          {" "}
        </div>
        <div className="w-[65px] lg:w-[40px] h-[30px] rounded-md lg:h-[35px] bg-dark-surface"></div>
      </div>
      <div className="flex justify-between items-center p-3 lg:p-5 ">
        <div className="w-[65px] lg:w-[80px] h-[30px] rounded-md lg:h-[35px] bg-dark-surface">
          {" "}
        </div>
        <div className="w-[65px] lg:w-[40px] h-[30px] rounded-md lg:h-[35px] bg-dark-surface"></div>
      </div>

      <div className="px-3 lg:px-4">
        <div className="my-3 lg:my-5 w-full h-[30px] lg:h-[35px] bg-dark-surface rounded-md "></div>
      </div>
    </div>
  );
};

export default ProfileLoader;
