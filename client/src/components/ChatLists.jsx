import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFindChatsQuery } from "../redux/api/chatApiSlice";
import ChatItem from "./ChatItem";
import { addChat } from "../redux/features/chatSlice";
import { useDispatch } from "react-redux";
import useDeleteChat from './../hooks/useDeleteChat';
const ChatLists = () => {
  const {
    data: chats,
    isLoading: chatLoading,
    error: chatError,
  } = useFindChatsQuery();
  const [chatDeleteApi,isDeleted] = useDeleteChat()
  const [isChatSelected,setChatSelected] = useState("");

  useEffect(()=>{
    console.log("Chat ", chats);
  },[chats])

  const dispatch = useDispatch();
  const handleStartChat = (chat) => {
    dispatch(addChat(chat));
  };

  return (
    <div className="w-full ">
      <h2 className="my-3 lg:my-4 text-lg lg:text-xl px-3 lg:px-4 text-white">
        Messages
      </h2>
      <div className="px-3 lg:px-4">
        <Link
          to="/request-messages"
          className="w-full cursor-pointer hover:bg-[#232329] p-1 rounded-md bg-dark-surface flex gap-2 items-center"
        >
          <span className="bg-green-700 rounded-full text-white text-[9px] p-1 ">
            9+
          </span>
          <span className="text-gray-light text-[10px] lg:text-xs">
            Request Messages
          </span>
        </Link>
      </div>

      <div className="w-full max-h-[300px] mt-2 scroll overflow-y-auto">
        {chats &&
          !chatLoading &&
          chats.payload.map((chat) => (
            <ChatItem
              isChatSelected={isChatSelected}
              setChatSelected={setChatSelected}
              chatDeleteApi={chatDeleteApi}
              handleStartChat={handleStartChat}
              key={chat._id}
              chat={chat}
            />
          ))}
      </div>
    </div>
  );
};

export default ChatLists;
