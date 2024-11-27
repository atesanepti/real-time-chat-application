import React, { useEffect, useState } from "react";
import OTPInput from "./../components/OTPInput";
import Message from "./../components/Message";
import { CiCircleInfo } from "react-icons/ci";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserVerifyMutation } from "../redux/api/userApiSlice";
const AccountVerify = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { state } = useLocation();

  const [userVerifyApi, { isLoading, error: verifyError }] =
    useUserVerifyMutation();

  const handleInput = async (code) => {
    if (code == state.otp) {
      try {
        const res = await userVerifyApi({
          userId: state.payload._id,
          code: state.otp,
        }).unwrap();
        console.log(res);
        navigate("/login", { state: state });
      } catch (error) {
        console.log(error);
      }
    } else {
      setError("Invalid Verification code");
    }
  };

  useEffect(() => {
    if (verifyError) {
      setError(verifyError.data.error);
    }
  }, [verifyError]);

  return (
    <div className="w-full h-screen max-h-screen overflow-hidden flex flex-col justify-center items-center bg-dark-primary">
      <Message variant="info">
        Activate Your account -{" "}
        <span className=" text-green-hard">
          We just sent Verification mail on your Email
        </span>
      </Message>
      <div className="  ">
        <h3 className="my-4 md:my-5 lg:my-7 text-center text-lg font-medium lg:text-2xl md:text-xl lg:font-semibold text-white">
          <span className="text-green-hard">Account</span> Verification
        </h3>
        <OTPInput
          isLoading={isLoading}
          onError={error}
          onSend={handleInput}
          buttonContent="Account Verify"
        />
      </div>
    </div>
  );
};

export default AccountVerify;
