import { useState } from "react";
import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";

export const ChatItem = ({
  chat,
  handleStartChat,
  chatDeleteApi,
  isChatSelected,
  setChatSelected,
}) => {
  const { user } = useSelector((state) => state.authR);
  const targetUserFind = (chat) => {
    const targetUser = chat.users.find((u) => {
      if (u._id !== user._id) {
        return user;
      }
    });
    return targetUser;
  };
  const { image, name, _id } = targetUserFind(chat);
  return (
    <div className="relative grid grid-cols-[100%_auto] overflow-x-hidden">
      <div
        onClick={() => handleStartChat(chat)}
        onDoubleClick={() => {
          setChatSelected((prev) => (prev == chat._id ? "" : chat._id));
        }}
        className={`relative transition-all bg-dark-primary hover:bg-dark  px-3 lg:px-4 gap-2 py-1 lg:py-2 cursor-pointer w-full flex items-center ${
          isChatSelected == chat._id
            ? "left-[-50px] !bg-dark"
            : "left-0 bg-dark-primary"
        }`}
      >
        <div className="w-[30px]  h-[30px] lg:w-[40px] lg:h-[40px] ">
          <img
            src={image}
            alt="user"
            className="w-full h-full rounded-full object-cover"
          />
        </div>

        <div>
          <span className="text-xs lg:text-sm text-white">{name}</span>
          <span className="text-[9px] lg:text-[10px] text-gray-light block">
            Hello, Kemon achen?
          </span>
        </div>
        <span className="text-white text-[9px]  absolute right-3 top-4">
          17:03
        </span>
      </div>
      <button
        onClick={() => chatDeleteApi(chat._id)}
        className="right-3 w-[30px] ml-[-40px] h-[30px] rounded-md items-center mt-3 bg-red-500 hover:bg-red-400 transition-colors flex justify-center"
      >
        <MdDelete className="text-white  text-sm lg:text-base" />
      </button>
    </div>
  );
};

export default ChatItem;
