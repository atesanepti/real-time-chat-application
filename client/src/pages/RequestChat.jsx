import React, { useEffect } from "react";
import {
  useChatActivateMutation,
  useFindRequestedChatsQuery,
} from "../redux/api/chatApiSlice";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoCheckmarkOutline } from "react-icons/io5";
import { addChat } from "../redux/features/chatSlice";
import useErrorNotification from "../hooks/useErrorNotification";
import { useDispatch } from "react-redux";
const RequestChat = () => {
  const [chatActivateAPi, { error: chatActivateError }] =
    useChatActivateMutation();
  const { data: chats, isLoading: chatLoading } = useFindRequestedChatsQuery();
  const onError = useErrorNotification();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleActivateChat = async (chatId) => {
    const res = await chatActivateAPi(chatId).unwrap();
  };

  const handleChatOpen = (chat) => {
    dispatch(addChat(chat));
    navigate("/chat");
  };

  useEffect(() => {
    if (chatActivateError) {
      onError({ title: "Chat Add", content: chatActivateError.data.error });
    }
  }, [chatActivateError]);

  return (
    <div className="w-full h-screen max-h-screen bg-dark-primary py-6 lg:py-12">
      <div className="w-[320px] p-3 lg:p-5 md:w-[350px] mx-auto">
        {chats && (
          <div>
            {/* header of request message  */}
            <div className="flex gap-4 items-center border-b border-b-gray-deep py-3 lg:py-4">
              <button
                className="bg-transparent border-none cursor-pointer"
                onClick={() => navigate(-1)}
              >
                <FaArrowLeftLong className="text-white text-sm lg:text-base" />
              </button>
              <h5 className="text-white text-sm">Request Messages</h5>
            </div>

            {/* list of requested chat  */}
            <ul className="max-h-[70vh] overflow-y-auto scroll">
              {chats.payload?.map((chat) => (
                <li
                  key={chat._id}
                  className={`relative transition-all bg-dark-primary hover:bg-dark  px-3 lg:px-4 gap-2 py-1 lg:py-2 cursor-pointer w-full flex items-center`}
                >
                  <div className="w-[30px]  h-[30px] lg:w-[40px] lg:h-[40px] ">
                    <img
                      src={chat.users.image}
                      alt="user"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>

                  <div>
                    <span className="text-xs lg:text-sm text-white">
                      {chat.users.name}
                    </span>
                    <span className="text-[9px] lg:text-[10px] text-gray-light block">
                      Hello, Kemon achen?
                    </span>
                  </div>
                  <button
                    onClick={() => handleActivateChat(chat._id)}
                    className="text-white cursor-pointer rounded-full text-[9px] w-[40px] flex items-center justify-center h-[40px] bg-[#0f7af54d] border border-[#0f7af58a]  absolute right-3 top-1/2 translate-y-[-50%]"
                  >
                    <IoCheckmarkOutline className="text-white text-xs lg:text-sm" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestChat;
