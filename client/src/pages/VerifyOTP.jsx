import React, { useEffect, useState } from "react";
import OTPInput from "./../components/OTPInput";
import { useOtpVerifyMutation } from "../redux/api/userApiSlice";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { CiCircleInfo } from "react-icons/ci";
import Message from "./../components/Message";
const VerifyOTP = () => {
  const [otpVerifyAPi, { isLoading: verifyLoading, error: verifyError }] =
    useOtpVerifyMutation();
  const [error, setError] = useState("");
  const setVerified = useOutletContext();

  const navigate = useNavigate();
  const { state } = useLocation();
  const handleVerify = async (code) => {
    if (!code) return setError("OTP Code is required");

    const res = await otpVerifyAPi({ code, userId: state._id }).unwrap();
    navigate("/forget-password");
    setVerified(true);
  };

  useEffect(() => {
    if (!state) {
      navigate("/forget-password");
    }
  }, [state, navigate]);

  useEffect(() => {
    if (verifyError) {
      setError(verifyError.data.error);
    }
  }, [verifyError]);

  return (
    <div className=" ">
      <Message variant="info">
        Forget Password -{" "}
        <span className=" text-green-hard">We just sent OTP on your Email</span>
      </Message>
      <OTPInput
        isLoading={verifyLoading}
        onError={error}
        buttonContent="Verify"
        onSend={handleVerify}
      />
    </div>
  );
};

export default VerifyOTP;
