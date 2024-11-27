import React, { useEffect, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import Button from "./../components/Button";
import { MdError, MdBlock } from "react-icons/md";
import { useChangePasswordMutation } from "../redux/api/userApiSlice";
import Notification from "./../components/Notification";
import LogoutBtn from "./../components/LogoutBtn";
import AccountDelete from "./../components/AccountDelete";

const Setting = () => {
  const [
    passwordChangeApi,
    { isLoading: passwordChangeLoading, error: passwordChangeError },
  ] = useChangePasswordMutation();
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [notification, setNotification] = useState("");
  const [passwordShow, setPasswordShow] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [error, setError] = useState(null);
  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordShowToggle = (entry) => {
    setPasswordShow((prev) => ({ ...prev, [entry]: !prev[entry] }));
  };

  const handleChangePassword = async () => {
    if (!form.currentPassword) {
      return setError("Current password is Empty");
    }
    if (!form.newPassword) {
      return setError("New password is Empty");
    }
    if (!form.confirmPassword) {
      return setError("Confirm password is Empty");
    }
    if (form.confirmPassword !== form.newPassword) {
      return setError("Confirm password does not match");
    }

    const res = await passwordChangeApi({
      oldPassword: form.currentPassword,
      password: form.newPassword,
    }).unwrap();
    setError(null);
    setNotification("Password Changed");
  };

  useEffect(() => {
    if (passwordChangeError) {
      setError(passwordChangeError.data.error);
    }
  }, [passwordChangeError]);
  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        setNotification("");
      }, 2000);
    }
  }, [notification]);

  return (
    <div className="w-full min-h-screen bg-dark py-6 lg:py-10 ">
   
      <div className="w-[340px] rounded-lg sm:w-[60%] md:w-[45%] lg:w-[35%]  mx-auto bg-dark md:bg-dark-primary">
        <div className="border-b-2 border-b-gray-deep flex items-center justify-between p-3 lg:p-6">
          <Link to={-1}>
            <IoIosArrowBack className="text-sm lg:text-lg text-white" />
          </Link>
          <h4 className="text-sm lg:text-base text-white">Setting</h4>
        </div>

        <div className="p-3 lg:p-5 my-2 lg:my-3 border-b-2 border-b-gray-deep">
          <h4 className="text-sm lg:text-[15px] text-white my-3 lg:my-3">
            Change Password
          </h4>
          <div className="">
            <div className="relative flex-1  w-full h-[40px] lg:h-[45px] mb-3">
              <input
                className="block   w-full h-full px-4 md:px-5 lg:px-6 py-5  outline-none rounded-full bg-dark-surface text-white text-xs lg:text-sm placeholder:text-[10px] placeholder:lg:text-xs placeholder:text-gray-400 border-2 border-dark-surface focus:border-green-hard  "
                type={passwordShow.currentPassword ? "text" : "password"}
                value={form.currentPassword}
                placeholder="Current Password"
                onChange={handleChangeForm}
                name="currentPassword"
              />
              <div
                onClick={() => handlePasswordShowToggle("currentPassword")}
                className="absolute top-1/2 translate-y-[-50%] right-4 cursor-pointer text-white"
              >
                {passwordShow.currentPassword ? (
                  <FaRegEyeSlash className="text-xs lg:text-sm" />
                ) : (
                  <FaRegEye className="text-xs lg:text-sm" />
                )}
              </div>
            </div>
            <div className="relative flex-1  w-full h-[40px] lg:h-[45px] mb-3">
              <input
                className="block   w-full h-full px-4 md:px-5 lg:px-6 py-5  outline-none rounded-full bg-dark-surface text-white text-xs lg:text-sm placeholder:text-[10px] placeholder:lg:text-xs placeholder:text-gray-400 border-2 border-dark-surface focus:border-green-hard  "
                type={passwordShow.newPassword ? "text" : "password"}
                value={form.newPassword}
                placeholder="New Password"
                onChange={handleChangeForm}
                name="newPassword"
              />
              <div
                onClick={() => handlePasswordShowToggle("newPassword")}
                className="absolute top-1/2 translate-y-[-50%] right-4 cursor-pointer text-white"
              >
                {passwordShow.newPassword ? (
                  <FaRegEyeSlash className="text-xs lg:text-sm" />
                ) : (
                  <FaRegEye className="text-xs lg:text-sm" />
                )}
              </div>
            </div>

            <div className="relative flex-1  w-full h-[40px] lg:h-[45px] mb-3">
              <input
                className="block   w-full h-full px-4 md:px-5 lg:px-6 py-5  outline-none rounded-full bg-dark-surface text-white text-xs lg:text-sm placeholder:text-[10px] placeholder:lg:text-xs placeholder:text-gray-400 border-2 border-dark-surface focus:border-green-hard  "
                type={passwordShow.confirmPassword ? "text" : "password"}
                value={form.confirmPassword}
                placeholder="Confirm Password"
                onChange={handleChangeForm}
                name="confirmPassword"
              />
              <div
                onClick={() => handlePasswordShowToggle("confirmPassword")}
                className="absolute top-1/2 translate-y-[-50%] right-4 cursor-pointer text-white"
              >
                {passwordShow.confirmPassword ? (
                  <FaRegEyeSlash className="text-xs lg:text-sm" />
                ) : (
                  <FaRegEye className="text-xs lg:text-sm" />
                )}
              </div>
            </div>

            {error && (
              <span className="flex items-center gap-2 text-red-500 text-[10px] lg:text-xs">
                <MdError className="text-sm lg:text-base" /> {error}{" "}
              </span>
            )}

            <div className=" my-4 lg:my-5 w-full">
              <Button
                disabled={
                  !form.currentPassword ||
                  !form.confirmPassword ||
                  !form.newPassword
                }
                onClick={handleChangePassword}
                isLoading={passwordChangeLoading}
                style="!w-full bg-blue-600"
              >
                Change Password
              </Button>
            </div>
          </div>
        </div>

        <div className="p-3 lg:p-5 gap-2 flex bg-transparent items-center justify-between">
          <LogoutBtn btnStyle="!w-full bg-transparent border border-red-600 !text-red-600 !block" />
          <AccountDelete btnStyles="!w-full bg-red-600" />
        </div>

        <div className="p-3 lg:p-5">
          <Link
            to="/block-list"
            className=" w-full flex justify-between items-center bg-dark-surface px-3 lg:px-4 py-2 lg:py-3 rounded-md cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <MdBlock className="text-base text-white" />{" "}
              <span className="text-xs lg:text-sm text-white">Block List</span>
            </div>
            <IoIosArrowForward className="text-base text-white" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Setting;
