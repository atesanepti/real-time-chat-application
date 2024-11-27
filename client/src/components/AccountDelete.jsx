import React from "react";
import { useDeleteUserMutation } from "../redux/api/userApiSlice";
import { logout } from "../redux/features/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
const AccountDelete = ({ btnStyles }) => {
  const [
    userDeleteApi,
    { isLoading: userDeleteLoading, error: userDeleteError },
  ] = useDeleteUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUserDelete = async () => {
    if (!confirm("Are you sure to Delete account?")) return;
    const res = await userDeleteApi().unwrap();
    dispatch(logout());
    navigate("/");
  };

  return (
    <Button
      isLoading={userDeleteLoading}
      onClick={handleUserDelete}
      style={`${btnStyles}`}
    >
      Delete Account
    </Button>
  );
};

export default AccountDelete;
