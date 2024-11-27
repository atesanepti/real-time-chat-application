import React, { useEffect } from "react";
import Button from "./../components/Button";
import { useState } from "react";
import { useFindUsersQuery } from "../redux/api/userApiSlice";
import UserFindLoader from "./../components/UserFindLoader";
import {
  useCreateChatMutation,
  useFindChatsQuery,
} from "../redux/api/chatApiSlice";
import { useSelector } from "react-redux";
import SearchedUsers from "../components/SearchedUsers";
const FindUser = ({ setFindUserShow }) => {
  const [user, setUser] = useState("");
  const auth = useSelector((state) => state.authR);
  const { data: users, isLoading, error } = useFindUsersQuery({ search: user });
  const { data: chats, isLoading: chatLoading } = useFindChatsQuery();
  // const [userAdded, setUserAdded] = useState("");
  const [
    createChatApi,
    { isLoading: createChatLoading, error: createChatError },
  ] = useCreateChatMutation();
  const closeWindow = (e) => {
    if (e.target.matches("#findUserBox")) {
      setFindUserShow(false);
    }
  };

  const handleCreateChat = async (otherUser) => {
    const users = [otherUser, auth.user._id];
    const res = await createChatApi({ users }).unwrap();
  };

  useEffect(() => {
    console.log("user fetched");
  }, [users]);

  return (
    <div
      onClick={closeWindow}
      id="findUserBox"
      className="fixed top-0 left-0 w-full h-screen bg-[#0000002c]"
    >
      <div className="w-[300px] rounded-lg sm:w-[320px] md:w-[350px] lg:w-[400px] mt-12 mx-auto bg-dark-primary p-3 md:p-4 lg:p-5">
        <div className="relative py-2 lg:p-4 md:py-3 w-full">
          <input
            type="text"
            className="w-full block border-none outline-none bg-dark-surface text-white text-xs lg:text-sm px-3 lg:px-4 py-2 rounded-md"
            placeholder="Find user"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </div>
        <div className="h-[400px] scroll-none overflow-auto">
          {!user && users?.length <= 0 && (
            <span className="text-[11px] lg:text-xs block text-center mt-4 text-gray-light">
              Find Your Friends
            </span>
          )}
          {user && users?.length <= 0 && (
            <span className="text-[11px] lg:text-xs block text-center mt-4 text-gray-light">
              User Not found!
            </span>
          )}
          {users && !isLoading && (
            <div>
              {users.map((user) => (
                <SearchedUsers
                  key={user._id}
                  user={user}
                  chats={chats}
                  handleCreateChat={handleCreateChat}
                  ownUser={auth.user._id}
                />
              ))}
            </div>
          )}

          {!user && isLoading && <UserFindLoader />}
        </div>
      </div>
    </div>
  );
};

export default FindUser;
