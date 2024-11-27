import { useDispatch } from "react-redux";
import { setNotification } from "../redux/features/notificationM";

const useErrorNotification = () => {
  const dispatch = useDispatch();

  const error = (message) => {
    dispatch(setNotification({ message, variant: "error" }));
  };

  return error;
};

export default useErrorNotification;
