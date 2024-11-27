import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./redux/features/userSlice";
import { useEffect } from "react";
import Notification from "./components/Notification";

function App() {
  const { isLoading } = useSelector((state) => state.authR);
  const { chat } = useSelector((state) => state.chatR);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

    useEffect(() => {
      console.log("chat from app",chat)
    }, [chat]);

  return (
    <div>
      {!isLoading ? (
        <div>
          <Notification />
          <Outlet />
        </div>
      ) : (
        <span className="text-xs lg:text-sm text-black absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
          Data Fetching..
        </span>
      )}
    </div>
  );
}

export default App;
