import { useEffect, useState } from "react";
import { useBlockChatMutation } from "../redux/api/chatApiSlice";
import useSuccessNotification from "./useSuccessNotification";
import useErrorNotification from "./useErrorNotification";
import { useDispatch } from "react-redux";
const useUserBlock = () => {
  const [blockApi, { error }] = useBlockChatMutation();
  const [isBlocked,setBlocked] = useState(false)
  const onError = useErrorNotification();
  const onSuccess = useSuccessNotification();
  const [data, setData] = useState({});
  const handleBlockApi = async ({ block }) => {
    setData({ block });
    const res = await blockApi(block._id).unwrap();
    onSuccess({ title: "Block", content: `You blocked ${block.name}` });
    setBlocked(true)
  };

  useEffect(() => {
    if (error) {
      onError({ title: "Block", content: `${error.data.error}` });
    }
  }, [error, onError, data]);

  return [handleBlockApi,isBlocked];
};

export default useUserBlock;
