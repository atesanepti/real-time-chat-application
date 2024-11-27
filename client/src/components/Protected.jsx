import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import AccountVerify from "../pages/AccountVerify";
const Protected = () => {
  const { user } = useSelector((state) => state.authR);
  console.log("user" ,user)
  return (
    <>
      {user && user.isVerified ? (
        <Outlet />
      ) : user && !user.isVerified ? (
        <AccountVerify />
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default Protected;
