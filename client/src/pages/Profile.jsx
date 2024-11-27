import React, { useEffect, useState } from "react";
import {
  useFindMineQuery,
  useUpdateUserMutation,
} from "../redux/api/userApiSlice";
import { MdOutlineEdit } from "react-icons/md";
import { FaGear, FaImage } from "react-icons/fa6";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdError } from "react-icons/md";
import Button from "./../components/Button";
import { Form, Link, Outlet, useParams } from "react-router-dom";
import { setCredentials } from "../redux/features/userSlice";
import { useDispatch } from "react-redux";
import ProfileLoader from "../components/ProfileLoader";
import useErrorNotification from './../hooks/useErrorNotification';
import useSuccessNotification from './../hooks/useSuccessNotification';
const Profile = () => {
  const dispatch = useDispatch();
  const [editable, setEditable] = useState(false);
  const [edit, setEdit] = useState("");
  const [bioToggle, setBioToggle] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    name: "",
    userImage: "",
    bio: "",
    userName: "",
  });

  const {
    data: userInfo,
    isLoading,
    error: userFindError,
  } = useFindMineQuery();
  const [profileUpdateApi, { isLoading: updateLoading, error: updateError }] =
    useUpdateUserMutation();
  const handleChange = (e) => {
    const { value, name } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const errorNotic = useErrorNotification();
  const successNotic = useSuccessNotification()

  const handleImageChange = (image) => {
    handleEditIcon("userImage");
    setForm((prev) => ({ ...prev, userImage: image }));
  };

  useEffect(() => {
    if (userInfo) {
      setForm((prev) => ({
        ...prev,
        name: userInfo.payload.name,
        bio: userInfo.payload.bio,
        userName: userInfo.payload.userName,
        userImage: userInfo.payload.image,
      }));
    }
  }, [userInfo]);

  const handleEditIcon = (value) => {
    if (value == "userImage") {
      if (!form.userImage) {
        setEdit("");
      }
    }
    if (edit == value) {
      setEdit("");
    } else {
      setEdit(value);
    }
  };

  useEffect(() => {
    if (edit) {
      setEditable(true);
    } else {
      setEditable(false);
    }
  }, [edit]);

  useEffect(() => {
    if (updateError) {
      setError(updateError.data.error);
    }
  }, [updateError, setError]);

  const handleUpdateProfile = async () => {
    const formData = new FormData();
    for (let key in form) {
      if (form[key] !== "") {
        formData.append(key, form[key]);
      }
    }

    const res = await profileUpdateApi(formData).unwrap();
    successNotic({title : "Profile Update", content : 'Your Profile updated successfully'});
    dispatch(setCredentials(res.payload));
    setEditable(false);
    setEdit("");
  };



  return (
    <div className="w-full  min-h-screen bg-dark py-4 lg:py-8">
      <div className="w-[340px] rounded-lg sm:w-[60%] md:w-[45%] lg:w-[35%]  mx-auto bg-dark md:bg-dark-primary ">
        {!userInfo && isLoading && <ProfileLoader />}

        {userInfo && !isLoading && (
          <div>
            <div className="p-3 flex items-center justify-between lg:p-5 border-b lg:border-b-2 border-b-gray-deep">
              <Link to="/chat">
                <IoIosArrowBack className="text-sm lg:text-lg text-white" />
              </Link>
              <span className="text-sm lg:text-base   text-white">
                Contact Info
              </span>
            </div>

            <div className="p-6 lg:p-8 border-b lg:border-b-2 border-b-gray-deep flex flex-col justify-center items-center">
              <div className="w-[70px] relative lg:w-[90px] aspect-square rounded-full ">
                <img
                  src={
                    typeof form.userImage == "string"
                      ? form.userImage
                      : URL.createObjectURL(form.userImage)
                  }
                  alt="user image"
                  className="w-full h-full rounded-full object-cover"
                />
                <div className="absolute top-[60%] right-0">
                  <input
                    accept="image/png, image/jpg, image/jpeg"
                    type="file"
                    className="hidden"
                    id="image"
                    onChange={(e) => handleImageChange(e.target.files[0])}
                  />
                  <label
                    htmlFor="image"
                    className="cursor-pointer w-[25px] lg:w-[30px] h-[25px] lg:h-[30px] rounded-full bg-dark p-1 flex justify-center items-center"
                  >
                    <FaImage className="text-white text-[10px] lg:text-xs" />
                  </label>
                </div>
              </div>
              <h4 className="my-1 lg:my-3 text-sm lg:text-base text-white font-medium">
                {userInfo.payload.name}
              </h4>
              <span className="text-xs lg:text-sm text-gray-light">
                {userInfo.payload.email}
              </span>
            </div>

            <div className="border-b lg:border-b-2 border-b-gray-deep p-3 lg:p-5 flex items-center justify-between">
              <div>
                <h4 className="text-xs lg:text-sm text-gray-light">Name</h4>
                {editable && edit == "name" ? (
                  <div className="my-1 lg:my-2">
                    <input
                      onChange={handleChange}
                      type="text"
                      value={form.name}
                      name="name"
                      className="h-[40px] lg:h-[45px] bg-dark-surface text-white text-xs lg:text-sm rounded-full px-3 lg:px-4 border-none outline-none"
                    />
                  </div>
                ) : (
                  <span className="text-xs lg:text-sm text-white">
                    {userInfo.payload.name}
                  </span>
                )}
              </div>
              <div
                className="w-[40px] h-[40px] cursor-pointer flex items-center justify-center p-1 rounded-full"
                onClick={() => handleEditIcon("name")}
              >
                <MdOutlineEdit className="text-white text-base lg:text-lg" />
              </div>
            </div>

            <div className="border-b lg:border-b-2 border-b-gray-deep p-3 lg:p-5 flex items-center justify-between">
              <div>
                <h4 className="text-xs lg:text-sm text-gray-light">
                  User Name
                </h4>
                {editable && edit == "userName" ? (
                  <div className="my-1 lg:my-2">
                    <input
                      onChange={handleChange}
                      type="text"
                      value={form.userName}
                      name="userName"
                      className="h-[40px] lg:h-[45px]  bg-dark-surface text-white text-xs lg:text-sm rounded-full px-3 lg:px-4 border-none outline-none"
                    />
                  </div>
                ) : (
                  <span className="text-xs lg:text-sm text-white">
                    {userInfo.payload.userName}
                  </span>
                )}
              </div>
              <div
                className="w-[40px] h-[40px] cursor-pointer flex items-center justify-center p-1 rounded-full"
                onClick={() => handleEditIcon("userName")}
              >
                <MdOutlineEdit className="text-white text-base lg:text-lg" />
              </div>
            </div>

            <div className="border-b lg:border-b-2 border-b-gray-deep p-3 lg:p-5 flex items-center justify-between">
              <div>
                <h4 className="text-xs lg:text-sm text-gray-light">Bio</h4>

                {editable && edit == "bio" ? (
                  <div className="my-1 lg:my-2">
                    <input
                      onChange={handleChange}
                      type="text"
                      value={form.bio}
                      name="bio"
                      className="h-[40px] lg:h-[45px] bg-dark-surface text-white text-xs lg:text-sm rounded-full px-3 lg:px-4 border-none outline-none"
                    />
                  </div>
                ) : (
                  <span className="text-xs lg:text-sm  text-white">
                    {userInfo.payload.bio ? (
                      <>
                        {" "}
                        {bioToggle
                          ? userInfo.payload.bio.substr(0, 40)
                          : userInfo.payload.bio}{" "}
                        <button
                          onClick={() => setBioToggle(!bioToggle)}
                          className="text-lg text-blue-400 lg:text-xs"
                        >
                          {" "}
                          See more
                        </button>
                      </>
                    ) : (
                      <span className="text-sm lg:text-base text-white">
                        Empty
                      </span>
                    )}
                  </span>
                )}
              </div>

              <div
                className="w-[40px] h-[40px] cursor-pointer flex items-center justify-center p-1 rounded-full"
                onClick={() => handleEditIcon("bio")}
              >
                <MdOutlineEdit className="text-white text-base lg:text-lg" />
              </div>
            </div>
            {error && (
              <span className="my-2 lg:my-3 flex items-center gap-2 text-red-500 text-[10px] lg:text-xs  ">
                <MdError className="text-sm lg:text-base " />
                {error}
              </span>
            )}
            <div className="w-full px-3 lg:px-5">
              <Button
                isLoading={updateLoading}
                onClick={handleUpdateProfile}
                style={`!w-full my-2 lg:my-4 `}
                disabled={!editable}
              >
                Update Profile
              </Button>
            </div>

            <div className=" p-3 lg:p-5">
              <Link
                to="/setting"
                className=" w-full flex justify-between items-center bg-dark-surface px-3 lg:px-4 py-2 lg:py-3 rounded-md cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <FaGear className="text-base text-white" />{" "}
                  <span className="text-xs lg:text-sm text-white">Setting</span>
                </div>
                <IoIosArrowForward className="text-sm lg:text-base text-white" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
