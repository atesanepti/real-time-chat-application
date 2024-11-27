import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { FaMagnifyingGlass } from "react-icons/fa6";
import {
  MdOutlineBlock,
  MdMail,
  MdOutlineFavorite,
  MdFavorite,
  MdDelete,
} from "react-icons/md";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { useFindUserQuery } from "../redux/api/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  useDeleteChatMutation,
  useBlockChatMutation,
  useChatAccessCheckeMutation,
} from "../redux/api/chatApiSlice";
import useSuccessNotification from "../hooks/useSuccessNotification";
import { removeToBlock, addToBlock } from "../redux/features/blockSlice";
import Model from "./../components/Model";
import Button from "./../components/Button";
import useUserBlock from "../hooks/useUserBlock";
import useUserUnblock from "../hooks/useUserUnblock";
import useDeleteChat from "./../hooks/useDeleteChat";
export const UserProfile = () => {
  const userData = useSelector((state) => state.authR);
  const { chat } = useSelector((state) => state.chatR);
  const [isChatDeleteBox, setChatDeleteBox] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: user,
    isLoading: userLoading,
    error: userError,
  } = useFindUserQuery(id);

  const [accessCheckApi, { isLoading: accessCheckLoading }] =
    useChatAccessCheckeMutation();
  const [blockedBy, setBlockedBy] = useState("");
  const [deleteChatApi,isDeleted] = useDeleteChat();
  const [unBlockApi,isUnBlocked] = useUserUnblock();
  const [blockApi,isBlocked] = useUserBlock();

  useEffect(() => {
    if (user) {
      accessCheckApi(user._id)
        .unwrap()
        .then((res) => {
          setBlockedBy(res.blcokedBy);
        });
    }
  }, [user, accessCheckApi, isBlocked, isUnBlocked]);

  useEffect(() => {
    if (!chat) {
      navigate("/chat");
    }
  }, [chat, navigate]);

  return (
    <>
      {!accessCheckLoading && (
        <div className="w-full relative h-screen max-h-screen bg-dark-primary">
          <div className="absolute top-10 left-10">
            <Link to={-1}>
              <IoIosArrowBack className="text-white text-base lg:text-lg cursor-pointer" />
            </Link>
          </div>
          <div className="w-[320px] py-5 lg:py-8 md:w-[350px] mx-auto">
            {user && !userLoading && (
              <div>
                <div className="text-center mx-auto border-b border-b-gray-deep">
                  <div className="w-[60px] lg:w-[90px] my-2 mx-auto aspect-square">
                    <img
                      src={user.image}
                      alt="user"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <span className="text-sm text-white  lg:text-base">
                    {user.name}
                  </span>
                  <span className="text-xs block text-gray-light  lg:text-sm">
                    @{user.userName}
                  </span>
                  <div className="flex items-center gap-3 lg:gap-4 justify-center my-4 lg:my-6">
                    {blockedBy == user._id ? (
                      <button className="flex flex-col items-center gap-2 cursor-not-allowed">
                        <div className="w-[25px] h-[25px]  lg:w-[30px] lg:h-[30px] p-2 flex items-center justify-center rounded bg-dark-surface">
                          <MdOutlineBlock className="text-red-500 text-sm lg:text-sm" />{" "}
                        </div>
                        <span className="text-[10px] lg:text-xs text-white">
                          Unavilable
                        </span>
                      </button>
                    ) : blockedBy != userData.user._id ? (
                      <button
                        onClick={() => blockApi({ block: user })}
                        className="flex flex-col items-center gap-2 cursor-pointer"
                      >
                        <div className="w-[25px] h-[25px] lg:w-[30px] lg:h-[30px] p-2 flex items-center justify-center rounded bg-dark-surface">
                          <MdOutlineBlock className="text-red-500 text-sm lg:text-sm" />{" "}
                        </div>
                        <span className="text-[10px] lg:text-xs text-white">
                          Block
                        </span>
                      </button>
                    ) : (
                      <button
                        onClick={() => unBlockApi({ unBlock: user })}
                        className="flex flex-col items-center gap-2 cursor-pointer"
                      >
                        <div className="w-[25px] h-[25px] lg:w-[30px] lg:h-[30px] p-2 flex items-center justify-center rounded bg-dark-surface">
                          <MdOutlineBlock className="text-red-500 text-sm lg:text-sm" />{" "}
                        </div>
                        <span className="text-[10px] lg:text-xs text-white">
                          Unblock
                        </span>
                      </button>
                    )}

                    <Link
                      to={-1}
                      className="flex flex-col items-center gap-2 cursor-pointer"
                    >
                      <div className="w-[25px] h-[25px] lg:w-[30px] lg:h-[30px] p-2 flex items-center justify-center rounded bg-dark-surface">
                        <MdMail className="text-green-500 text-sm lg:text-sm" />{" "}
                      </div>
                      <span className="text-[10px] lg:text-xs text-white">
                        Message
                      </span>
                    </Link>

                    <div className="flex flex-col items-center gap-2 cursor-pointer">
                      <div className="w-[25px] h-[25px] lg:w-[30px] lg:h-[30px] p-2 flex items-center justify-center rounded bg-dark-surface">
                        <MdOutlineFavorite className="text-pink-500 text-sm lg:text-sm" />{" "}
                      </div>
                      <span className="text-[10px] lg:text-xs text-white">
                        Favorit
                      </span>
                    </div>
                  </div>
                </div>

                <div className="my-7 lg:my-10">
                  <button
                    onClick={() => deleteChatApi(chat?._id)}
                    className="w-full bg-dark-surface rounded-md flex items-center gap-2 lg:gpa-3 p-2 lg:p-3 cursor-pointer my-2 lg:my-3"
                  >
                    <MdDelete className="text-white text-sm lg:text-base" />{" "}
                    <span className="text-white text-xs ">
                      Delete Message Hisotry
                    </span>
                  </button>
                  <button className="w-full bg-dark-surface rounded-md flex items-center gap-2 lg:gpa-3 p-2 lg:p-3 cursor-pointer my-2 lg:my-3">
                    <FaMagnifyingGlass className="text-white text-sm lg:text-base" />{" "}
                    <span className="text-white text-xs ">Search Message</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
