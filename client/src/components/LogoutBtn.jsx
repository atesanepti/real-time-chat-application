import { useLogoutMutation } from "../redux/api/userApiSlice";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { logout } from "../redux/features/userSlice";
import { removeChat } from "../redux/features/chatSlice";
import { useDispatch } from "react-redux";
const LogoutBtn = ({ btnStyle }) => {
  const [logoutApi, { isLoading }] = useLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const res = await logoutApi().unwrap();
    dispatch(logout());
    dispatch(removeChat());
  };
  return (
    <Button
      isLoading={isLoading}
      onClick={handleLogout}
      style={` bg-red-500 text-white ${btnStyle}`}
    >
      Logout
    </Button>
  );
};

export default LogoutBtn;
