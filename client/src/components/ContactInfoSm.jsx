import React from "react";
import { useFindUserQuery } from "../redux/api/userApiSlice";
import { useSelector } from "react-redux";
import { FaGear } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import ContactInfoSmLoader from "./ContactInfoSmLoader";
import LogoutBtn from "./LogoutBtn";
import { Link } from "react-router-dom";
const ContactInfoSm = () => {
  const { user } = useSelector((state) => state.authR);
  console.log(user);
  const {
    data: userInfo,
    isLoading: userLoading,
    error: userFindError,
  } = useFindUserQuery(user._id);

  return (
    <div className="hidden lg:block bg-dark-primary border-l border-l-gray-deep">
      {userLoading && <ContactInfoSmLoader />}
      {!userLoading && userInfo && (
        <div className="w-full ">
          <div className="p-5 border-b border-b-gray-deep">
            <span className="text-sm font-medium text-white">
              Contact Info
            </span>
          </div>

          <div className="p-5 border-b border-b-gray-deep flex flex-col justify-center items-center">
            <div className="w-[100px] aspect-square rounded-full ">
              <img
                src={userInfo.image}
                alt="user image"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <h4 className="my-3 text-base text-white font-medium">
              {userInfo.name}
            </h4>
            <span className="text-sm text-gray-light">{userInfo.email}</span>
          </div>

          {userInfo.bio && (
            <div className="p-5 border-b border-b-gray-deep">
              <h4 className="my-4 text-base text-white font-medium">Bio</h4>
              <span className="text-sm text-gray-light">{userInfo.bio}</span>
            </div>
          )}

          {userInfo._id == user._id && (
            <div className="p-5">
              <Link
                to="/setting"
                className=" w-full flex justify-between items-center bg-dark-surface px-4 py-3 rounded-md cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <FaGear className="text-base text-white" />{" "}
                  <span className="text-sm text-white">Setting</span>
                </div>
                <IoIosArrowForward className="text-base text-white" />
              </Link>

              <div className="mt-5 flex items-center justify-between">
                <LogoutBtn />
              </div>
            </div>
          )}
          
        </div>
      )}
    </div>
  );
};

export default ContactInfoSm;
