import { useEffect, useState } from "react";
import { useDeleteChatMutation } from "../redux/api/chatApiSlice";
import useSuccessNotification from "./useSuccessNotification";
import useErrorNotification from "./useErrorNotification";
const useDeleteChat = () => {
  const onSuccess = useSuccessNotification();
  const onError = useErrorNotification();
  const [isDeleted, setIsDelete] = useState(false);
  const [deleteChatApi, { error }] = useDeleteChatMutation();
  const handleDeleteApi = async (chatId) => {
    const res = await deleteChatApi(chatId).unwrap();
    onSuccess({ title: "Chat Delete", content: "Chat is delete successfull" });
    setIsDelete(true);
  };
  useEffect(() => {
    if (error) {
      onError({ title: "Chat delete", content: error.data.error });
    }
  }, [error, onError]);
  return [handleDeleteApi, isDeleted];
};

export default useDeleteChat;
