import React, { useEffect, useState } from "react";
import ContactInfoSm from "./../components/ContactInfoSm";
import LeftBar from "./../components/LeftBar";
import Inbox from "./../components/Inbox";
import FindUser from "./FindUser";
import socketIo from "socket.io-client";

const io = socketIo("http://localhost:3001");

const Chat = () => {
  const [findUserShow, setFindUserShow] = useState(false);

  useEffect(()=>{
    io.on("connect", () => {
      console.log("Connected to server");
    });

    return () => {
      io.disconnect();
    };
  },[])

  return (
    <div className="bg-dark w-full h-screen max-h-screen overflow-hidden grid grid-cols-1 md:grid-cols-[60%_40%] lg:grid-cols-[25%_55%_20%]">
      <LeftBar setFindUserShow={setFindUserShow} />
      <Inbox />
      <ContactInfoSm />
      {findUserShow && <FindUser setFindUserShow={setFindUserShow} />}

    
    </div>
  );
};

export default Chat;
