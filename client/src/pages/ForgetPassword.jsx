import React, { useEffect, useState } from "react";
import { useForgetPasswordMutation } from "../redux/api/userApiSlice";
import ForgetPasswordForm from "../components/ForgetPasswordForm";
import Button from "./../components/Button";
import { MdError } from "react-icons/md";
import { useLocation, useNavigate, Outlet } from "react-router-dom";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();
  const [isVerified, setVerified] = useState(false);
  const navigate = useNavigate();

  const hasChild = location.pathname !== "/forget-password";

  const [forgetApi, { isLoading: forgetLoading, error: forgetError }] =
    useForgetPasswordMutation();

  const sendForgetCode = async () => {
    if (!email) return setError("Email is required");
    const res = await forgetApi(email).unwrap();
    navigate("verify", { state: { _id: res.payload._id } });
  };

  useEffect(() => {
    if (forgetError) {
      setError(forgetError.data.error);
    }
  }, [forgetError]);

  return (
    <div className="w-full h-screen max-h-screen bg-dark ">
      <h4 className="text-lg text-white md:text-xl lg:text-2xl font-semibold text-center py-8 lg:py-16 ">
        Forget Password
      </h4>
      <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] ">
        {isVerified ? (
          <>
            <ForgetPasswordForm userEmail={email} />
          </>
        ) : (
          <div>
            {hasChild ? (
              <Outlet context={setVerified} />
            ) : (
              <div className="mx-auto w-[300px]  sm:w-[350px] md:w-[370px] lg:w-[380px] ">
                <div className="w-full h-[40px] lg:h-[45px] mb-3">
                  <input
                    autoComplete="off"
                    className="block  w-full h-full  px-4 md:px-5 lg:px-6 py-5  outline-none rounded-full bg-dark-surface text-white text-xs lg:text-sm placeholder:text-[10px] placeholder:lg:text-xs placeholder:text-gray-400 border-2 border-dark-surface focus:border-green-hard  "
                    type="email"
                    value={email}
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {error && (
                  <span className="my-2  flex items-center gap-1 text-[10px] lg:text-xs  text-red-600">
                    <MdError className="text-xs lg:text-sm" /> {error}
                  </span>
                )}
                <Button
                  onClick={sendForgetCode}
                  isLoading={forgetLoading}
                  style="!w-full"
                >
                  Send Code
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgetPassword;
