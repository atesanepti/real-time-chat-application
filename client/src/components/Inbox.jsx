import React, { useEffect, useState } from "react";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { IoLockClosed } from "react-icons/io5";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GoBell } from "react-icons/go";
import { MdImage, MdOutlineBlock } from "react-icons/md";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoIosSend } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { useChatAccessCheckeMutation } from "../redux/api/chatApiSlice";
import ToggleMenu from "./ToggleMenu";
import Button from "./Button";
import useUserUnblock from "../hooks/useUserUnblock";
import useUserBlock from "./../hooks/useUserBlock";
import { removeChat } from "../redux/features/chatSlice";
const Inbox = () => {
  const { chat } = useSelector((state) => state.chatR);
  const { user } = useSelector((state) => state.authR);
  const [isSearchShow, setSearchShow] = useState(false);
  const [menuIsVisiable, setMenuVisiable] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [accessCheckApi, { isLoading: chcekAccessLoading }] =
    useChatAccessCheckeMutation();
  const [unBlockApi, isUnBlocked] = useUserUnblock();
  const [blockApi, isBlocked] = useUserBlock();
  const [blockedBy, setBlocedkBy] = useState("");
  const targetedUserFind = (chat) => {
    try {
      const users = chat?.users;
      if (!users) {
        throw new Error("Users is Empty");
      }
      const targetedUser = users?.find((u) => {
        if (u._id !== user._id) {
          return u;
        }
      });
      if (!targetedUser) {
        throw new Error("Users is Empty");
      }
      return targetedUser;
    } catch (error) {
      return null;
    }
  };

  let targetedUser = targetedUserFind(chat);
  const handleMessageSearch = () => {};

  const handleMessageInput = (e) => {
    if (e.target.scrollHeight < 70) {
      e.target.style.height = `${e.target.scrollHeight}px`;
    }
  };

  useEffect(() => {
    if (chat) {
      accessCheckApi(targetedUser._id)
        .unwrap()
        .then((res) => {
          console.log("block check", res);
          setBlocedkBy(res.blcokedBy);
        });
    }
  }, [chat, accessCheckApi, targetedUser, isBlocked, isUnBlocked]);

  return (
    <>
      {!chcekAccessLoading && (
        <div
          className={` w-full fixed top-0 ${
            chat ? "right-0" : "right-[-100%]"
          } h-screen max-h-screen overflow-x-hidden bg-dark transition-all lg:static`}
        >
          {!chat && (
            <div className="w-full h-screen flex flex-col justify-center items-center  ">
              <BiSolidMessageSquareDetail className="text-xl md:text-2xl lg:text-[40px] text-white" />
              <span className="text-[10px] my-3 lg:my-4 text-xs text-wrap flex text-white items-center gap-3">
                <IoLockClosed className="text-sm lg:text-base" />
                Start Your privet chat
              </span>
            </div>
          )}

          {chat && targetedUser && (
            <div className="w-full h-full  relative grid grid-cols-1 grid-rows-[auto_1fr_auto]  ">
              <div className="py-1 lg:py-2 border-b bg-dark-primary border-b-gray-deep px-3 lg:px-4 flex items-center justify-between gap-2 lg:gap-3">
                <button
                  onClick={() => dispatch(removeChat())}
                  className="bg-transparent cursor-pointer lg:hidden"
                >
                  <FaArrowLeftLong className="text-white text-base " />
                </button>
                <div
                  onClick={() => navigate(`/user/${targetedUser._id}`)}
                  className="flex items-center gap-3 lg:gap-6 hover:bg-[#19191d] cursor-pointer hover:rounded-lg p-1"
                >
                  <div className="w-[30px] h-[30px] lg:w-[40px] lg:h-[40px] ">
                    <img
                      src={targetedUser.image}
                      alt="user"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <div className="text-white text-xs lg:text-base">
                    {targetedUser.name}
                  </div>
                </div>

                {isSearchShow && (
                  <div className="hidden lg:flex items-center">
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Find message"
                      className=" flex-1  bg-dark-surface border-none outline-none text-xs lg:text-sm text-white rounded-s-md
              h-[30px] lg:h-[35px] px-2 lg:px-4"
                    />
                    <button
                      onClick={handleMessageSearch}
                      className="flex-1 rounded-e-md cursor-pointer bg-blue-600 text-white text-xs px-2 h-[30px] lg:h-[35px] "
                    >
                      <span className="lg:hidden">
                        <FaMagnifyingGlass className="text-xs" />
                      </span>
                      <span className="lg:inline hidden ">Search</span>
                    </button>
                  </div>
                )}

                <div className="flex items-center gap-6 lg:gap-8 ">
                  <FaMagnifyingGlass
                    className="hidden lg:block text-sm lg:text-base text-white cursor-pointer"
                    onClick={() => setSearchShow(!isSearchShow)}
                  />

                  <div className="relative">
                    <BsThreeDotsVertical
                      className="text-base lg:text-lg text-white cursor-pointer"
                      onClick={() => {
                        setMenuVisiable(true);
                      }}
                    />
                    <ToggleMenu
                      position="top-[100%] right-[100%]"
                      isVisiable={menuIsVisiable}
                      setVisiable={setMenuVisiable}
                    >
                      <button
                        onClick={() => {
                          if (blockedBy == targetedUser._id) {
                            return;
                          }
                          if (blockedBy == user._id) {
                            return unBlockApi({ unBlock: targetedUser });
                          } else {
                            return blockApi({ block: targetedUser });
                          }
                        }}
                        className="menu-item"
                      >
                        {blockedBy == user._id
                          ? "Un block"
                          : blockedBy == targetedUser._id
                          ? "Unavilable"
                          : "Block"}
                      </button>

                      <button
                        className="menu-item"
                        onClick={() => navigate(`/user/${targetedUser._id}`)}
                      >
                        More..
                      </button>
                    </ToggleMenu>
                  </div>
                </div>
              </div>

              <div className="h-full  w-full overflow-y-auto">
                <div className="w-[150px] text-center lg:w-[200px] mx-auto py-2 lg:py-5">
                  <div className="w-[60px] mx-auto h-[60px] lg:w-[70px] lg:h-[70px] ">
                    <img
                      src={targetedUser.image}
                      alt="user"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <h4 className="text-xs lg:text-sm text-white my-2 lg:my-3">
                    {targetedUser.name}
                  </h4>
                  {/* <div className="flex items-center gap-2 lg:gap-3">
                <div className="text-center  text-white cursor-pointer">
                  <CiHeart className="text-white mx-auto text-xs lg:text-sm " />
                  <span className="text-[8px] lg:text-[10px]">Favorit</span>
                </div>
                <div className="text-center text-white cursor-pointer">
                  <MdOutlineBlock className="text-white mx-auto text-xs lg:text-sm " />
                  <span className="text-[8px] lg:text-[10px]">Block</span>
                </div>
              </div> */}
                </div>

                <div className="mt-3 lg:mt-4 ">
                  <ul className="px-3 lg:px-5">
                    <li className={`message sender `}>
                      <div className="content">
                        <span className="text">Hello, How are you?</span>
                        <span className="time block text-right">10:30</span>
                      </div>
                    </li>
                    <li className={`message reciver`}>
                      <div className="content  !flex items-center gap-2">
                        <div className="w-[20px] aspect-square lg:w-[30px]">
                          <img
                            src={targetedUser.image}
                            alt="user"
                            className="w-full h-full object-cover rounded-full"
                          />
                        </div>
                        <span className="text">I am fine Allhamdullih</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="relative  w-full lg:w-[550px] mx-auto  ">
                {blockedBy === user._id && (
                  <div className="w-full py-2 px-3 lg:py-4 lg:px-4 flex items-center justify-center gap-2 lg:w-[550px]">
                    <span className="text-gray-light text-[10px] lg:text-xs">
                      You blocked {targetedUser.name}
                    </span>
                    <div className="flex ">
                      <button className=" text-red-500 text-xs lg:text-sm px-3 lg:px-4 rounded-md py-2 cursor-pointer">
                        Delete
                      </button>
                      <button
                        onClick={() => unBlockApi({ unBlock: targetedUser })}
                        className=" text-blue-500 text-xs lg:text-sm px-3 lg:px-4 rounded-md py-2 cursor-pointer"
                      >
                        Unblock
                      </button>
                    </div>
                  </div>
                )}

                {blockedBy == targetedUser._id && (
                  <span className="py-2 px-3 lg:py-4 lg:px-4 text-[10px] block lg:text-xs text-gray-400 text-center">
                    You can not message this user
                  </span>
                )}

                {!blockedBy && (
                  <form className="w-full lg:w-[550px] lg:my-2 mx-auto md:rounded-lg bg-dark-primary flex items-center gap-4 py-2 px-3 lg:py-4 lg:px-4">
                    <label htmlFor="file">
                      <MdImage
                        onClick={() => {}}
                        className="text-base lg:text-xl text-[#6A9C89] cursor-pointer"
                      />
                      <input
                        type="file"
                        className="hidden"
                        onClick={(e) => {}}
                        id="file"
                      />
                    </label>
                    <div className="relative flex-1  bg-dark-surface px-3 lg:px-4  focus:border-green-hard border border-dark-surface rounded-full">
                      <textarea
                        onInput={handleMessageInput}
                        id="message_area"
                        name="message"
                        placeholder="Message"
                        className="h-[35px] lg:h-[45px]  w-[90%] py-2 lg:py-3 bg-transparent  resize-none  outline-none   block text-white text-xs lg:text-sm "
                      ></textarea>
                      <MdOutlineEmojiEmotions className="absolute top-1/2 translate-y-[-50%] right-5 text-green-soft text-sm lg:text-base cursor-pointer " />
                    </div>
                    <button type="submit" onClick={() => {}}>
                      <IoIosSend className="text-base lg:text-xl text-[#6A9C89] cursor-pointer" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Inbox;
