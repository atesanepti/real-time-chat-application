import React, { useEffect, useState } from "react";
const SearchedUsers = ({ ownUser, user, chats, handleCreateChat }) => {
  const [isChatAvi, setChatAvi] = useState(false);

  useEffect(() => {
    if (chats) {
      const chatsData = chats.payload;
      const chatAvil = chatsData.find((chat) => {
        const usersId = chat.users.map((u) => {
          return u._id;
        });
        const clientUsersId = [ownUser, user._id];
        let isAvil = 0;

        for (let i = 0; i < clientUsersId.length; i++) {
          if (usersId.includes(clientUsersId[i])) {
            isAvil = isAvil + 1;
          }
        }
        if (isAvil == 2) {
          return chat;
        }
      });
      if (chatAvil) {
        setChatAvi(true);
      }
    }
  }, [chats, ownUser, user]);

  return (
    <div
      key={user._id}
      className="flex items-center w-full cursor-default  justify-between py-1 lg:py-2 bg-[#25262c] px-2 rounded-md mb-1 lg:mb-2"
    >
      <div className="flex gap-2 lg:gap-3 items-center">
        <div className="w-[30px] lg:w-[35px] h-[30px] lg:h-[35px] rounded-sm">
          <img
            src={user.image}
            alt={user.name}
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <div>
          <span className="text-[11px] lg:text-xs font-medium text-white">
            {user.name}
          </span>
        </div>
      </div>
      {isChatAvi ? (
        <button
          disabled={true}
          className="px-2 lg:px-3 font-medium py-1 lg:py-2 rounded-md bg-transparent text-green-deep text-[10px] lg:text-xs "
        >
          Added
        </button>
      ) : (
        <button
          onClick={() => handleCreateChat(user._id)}
          className="px-2 lg:px-3 py-1 lg:py-2 rounded-md bg-green-deep text-white text-[10px] lg:text-xs cursor-pointer"
        >
          Add
        </button>
      )}
    </div>
  );
};

export default SearchedUsers;
