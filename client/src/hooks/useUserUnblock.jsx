import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useUnBlockChatMutation } from "../redux/api/chatApiSlice";
import useSuccessNotification from "./useSuccessNotification";
import useErrorNotification from "./useErrorNotification";

const useUserUnblock = () => {
  const [unBlockApi, { error }] = useUnBlockChatMutation();
  const [isUnBlocked, setUnBlocked] = useState(false);
  const onSuccess = useSuccessNotification();
  const onError = useErrorNotification();
  const handleBlockApi = async ({ unBlock }) => {
    const res = await unBlockApi(unBlock._id).unwrap();
    onSuccess({
      title: "Unblock",
      content: `You have unblock ${unBlock.name}`,
    });
    setUnBlocked(true);
  };

  useEffect(() => {
    if (error) {
      onError({ title: "Unblock", content: error });
    }
  }, [error, onError]);

  return [handleBlockApi, isUnBlocked];
};

export default useUserUnblock;
