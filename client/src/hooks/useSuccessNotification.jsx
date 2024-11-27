import { useDispatch } from "react-redux";
import { setNotification } from "../redux/features/notificationM";

const useSuccessNotification = () => {
  const dispatch = useDispatch();

  const success = (message) => {
    dispatch(setNotification({ message, variant: "success" }));
  };

  return success;
};

export default useSuccessNotification;
