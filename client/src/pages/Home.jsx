import React from "react";
import { useSelector } from "react-redux";
import chatApp from "../assets/chat-app.png";
import Button from "./../components/Button";
import { PiWechatLogoFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const { user } = useSelector((state) => state.authR);

  const navigate = useNavigate();

  const navigateToChat = () => {
    if (user) {
      navigate("/chat");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="w-full overflow-hidden flex flex-col justify-center md:flex-row gap-5  md:justify-between md:items-center h-screen max-h-screen bg-dark">
      <div className="flex-1 px-6 md:px-8 lg:px-10 flex flex-col items-center justify-center">
        <h2 className="text-lg font-medium lg:font-semibold md:text-xl lg:text-3xl text-green-hard">
          Let's Start with
        </h2>
        <h4 className="text-base font-medium lg:font-semibold md:text-lg lg:text-xl text-white">
          Ethic Chat
        </h4>

        <Button onClick={navigateToChat} style="mt-4 md:mt-5 gap-3">
          Start Chat <PiWechatLogoFill className="text-sm lg:text-base" />
        </Button>
      </div>
      <div className="flex-1 h-auto px-10 md:px-5 lg:px-2">
        <img src={chatApp} className="w-full h-full" />
      </div>
    </div>
  );
};

export default Home;
