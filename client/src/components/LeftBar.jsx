import React from "react";
import { useFindUserQuery } from "../redux/api/userApiSlice";
import { RiMailAddFill } from "react-icons/ri";
import { HiMagnifyingGlassCircle } from "react-icons/hi2";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ChatLists from "./ChatLists";
const LeftBar = ({ setFindUserShow }) => {
  const { user } = useSelector((state) => state.authR);
  const { data: userInfo, isLoading, error } = useFindUserQuery(user._id);

  return (
    <div className="w-full bg-dark-primary border-r border-r-gray-deep">
      {!isLoading && userInfo && (
        <div>
          
          <div className="border-b border-b-gray-deep">
            <div className="px-4 py-2  lg:px-6 lg:py-3 flex items-center justify-between">
              <div className="w-[30px] lg:w-[35px]  block aspect-square">
                <img
                  src={userInfo.image}
                  className="object-cover w-full h-full rounded-full"
                  alt="user image"
                />
              </div>
              <div className=" flex items-center justify-center gap-2 ">
                <div className="w-[30px] h-[30px] lg:h-[35px] lg:w-[35px] rounded-full hover:bg-dark flex items-center justify-center ">
                  <RiMailAddFill
                    onClick={() => setFindUserShow(true)}
                    className="text-2xl text-white   p-1  cursor-pointer"
                  />
                </div>

                <Link
                  to="/profile"
                  className="w-[30px] h-[30px] lg:h-[35px] lg:w-[35px] rounded-full hover:bg-dark flex items-center justify-center"
                >
                  <BsThreeDotsVertical className="text-2xl text-white   p-1  cursor-pointer" />
                </Link>
              </div>
            </div>

            <div className="px-4 mb-2 lg:mb-3 py-2 lg:px-6 lg:py-3  relative ">
              <input
                type="text"
                placeholder="Search chat"
                className="block h-[35px] lg:h-[40px] px-2 md:px-3 lg:px-4 w-full outline-none rounded-md bg-dark-surface text-white text-xs lg:text-sm placeholder:text-gray-light"
              />
              <button className="bg-dark-surface  absolute top-1/2 right-8 translate-y-[-50%] px-3 py-2 lg:px-4 lg:py-3 cursor-pointer  ">
                <HiMagnifyingGlassCircle className="text-white text-base" />
              </button>
            </div>
          </div>

          <ChatLists />
        </div>
      )}
    </div>
  );
};

export default LeftBar;
