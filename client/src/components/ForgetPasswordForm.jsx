import { useState, useEffect } from "react";
import { useResetPasswordMutation } from "../redux/api/userApiSlice";
import { useNavigate } from "react-router-dom";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import Button from "./Button";
import { MdError } from "react-icons/md";
import useErrorNotification from './../hooks/useErrorNotification';
import useSuccessNotification from './../hooks/useSuccessNotification';
const ForgetPasswordForm = ({ userEmail }) => {
  const [data, setData] = useState({
    password: "",
    confirmPassword: "",
  });
  const errorNotic = useErrorNotification();
  const successNotic = useSuccessNotification()
  const [passwordShow, setPasswordShow] = useState(false);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);
  const navigate = useNavigate();
  const [
    resetPasswordApi,
    { isLoading: resetPassworldLoading, error: resetPassworError },
  ] = useResetPasswordMutation();
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = async () => {
    if (!data.password) {
      return setError("Password is required");
    } else if (!data.confirmPassword) {
      return setError("Confirm Password is required");
    }
    if (data.password !== data.confirmPassword) {
      return setError("Confirm password does not match");
    }

    const res = await resetPasswordApi({
      password: data.password,
      email: userEmail,
    }).unwrap();
    successNotic({title : "Password changed", message : "Your password changed! now Loging new"})
    navigate("/login");
  };

  useEffect(() => {
    if (resetPassworError) {
      setError(resetPassworError.data.error);
    }
  }, [resetPassworError]);

  return (
    <div className=" mx-auto w-[90%] sm:w-[300px] md:w-[350px]">
      <div className="relative mb-2 lg:mb-4 w-full h-[40px] lg:h-[45px]">
        <input
          autoComplete="off"
          className="block h-full w-full px-4 md:px-5 lg:px-6 py-5  outline-none rounded-full bg-dark-surface text-white text-xs lg:text-sm placeholder:text-[10px] placeholder:lg:text-xs placeholder:text-gray-400 border-2 border-dark-surface focus:border-green-hard  "
          type={passwordShow ? "text" : "password"}
          value={data.password}
          placeholder="Password"
          onChange={handleInputChange}
          name="password"
        />
        <div
          onClick={() => setPasswordShow(!passwordShow)}
          className="absolute top-1/2 translate-y-[-50%] right-4 cursor-pointer text-white"
        >
          {passwordShow ? (
            <FaRegEyeSlash className="text-xs lg:text-sm" />
          ) : (
            <FaRegEye className="text-xs lg:text-sm" />
          )}
        </div>
      </div>

      <div className="relative mb-2 lg:mb-4 w-full h-[40px] lg:h-[45px]">
        <input
          autoComplete="off"
          className="block h-full w-full px-4 md:px-5 lg:px-6 py-5  outline-none rounded-full bg-dark-surface text-white text-xs lg:text-sm placeholder:text-[10px] placeholder:lg:text-xs placeholder:text-gray-400 border-2 border-dark-surface focus:border-green-hard  "
          type={confirmPasswordShow ? "text" : "password"}
          value={data.confirmPassword}
          placeholder="Confirm Password"
          onChange={handleInputChange}
          name="confirmPassword"
        />
        <div
          onClick={() => setConfirmPasswordShow(!confirmPasswordShow)}
          className="absolute top-1/2 translate-y-[-50%] right-4 cursor-pointer text-white"
        >
          {confirmPasswordShow ? (
            <FaRegEyeSlash className="text-xs lg:text-sm" />
          ) : (
            <FaRegEye className="text-xs lg:text-sm" />
          )}
        </div>
      </div>
      {error && (
        <span className="my-2  flex items-center gap-1 text-[10px] lg:text-xs  text-red-600">
          <MdError className="text-xs lg:text-sm" /> {error}
        </span>
      )}
      <Button
        style="!w-full"
        isLoading={resetPassworldLoading}
        onClick={handleReset}
      >
        Change Passoword
      </Button>
    </div>
  );
};

export default ForgetPasswordForm;
