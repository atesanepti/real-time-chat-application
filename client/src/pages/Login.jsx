import { Link, useLocation, useNavigate } from "react-router-dom";
import Nav from "./../components/Nav";
import { useEffect, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import Button from "./../components/Button";
import { useLoginUserMutation } from "../redux/api/userApiSlice";
import { MdError } from "react-icons/md";
import { setCredentials } from "../redux/features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import useSuccessNotification from "./../hooks/useSuccessNotification";
import useErrorNotification from "./../hooks/useErrorNotification";
const Login = () => {
  const { user } = useSelector((state) => state.authR);
  const successNotic = useSuccessNotification();
  const errorNotic = useErrorNotification();
  const [form, setForm] = useState({
    loggToken: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [passwordShow, setPasswordShow] = useState(false);
  const [loginApi, { isLoading, error: error2 }] = useLoginUserMutation();

  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleFormChange = (e) => {
    const { value, name } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!form.loggToken) {
      return setError("Email or User name is require");
    } else if (!form.password) {
      return setError("Password is empty");
    }

    try {
      const res = await loginApi(form).unwrap();
      successNotic({ title: "Login!", content: "Login successfull" });
      dispatch(setCredentials(res));
      navigate("/chat");
    } catch (error) {
      console.log("lladfkajldfjlaksf",error2);
    }
  };

  useEffect(() => {
    if (error2) {
      setError(error2?.data?.error);
      errorNotic({ title: "Login", content: error2.data.error });
    }
  }, [error2]);

  useEffect(() => {
    if (state) {
      setForm((prev) => ({ ...prev, loggToken: state.payload.email }));
    }
  }, [state]);

  useEffect(() => {
    if (user) {
      navigate("/chat");
    }
  }, [user, navigate]);

  return (
    <div
      className="w-full h-screen max-h-screen overflow-hidden px-6 py-4 md:px-10 md:py-6 lg:px-20 lg:py-10 "
      id="auth-bg"
    >
      <Nav />

      <div className="flex flex-col w-full h-full justify-center mt-10">
        <div>
          <h3 className="text-xl my-1 lg:my-2 font-medium md:text-base lg:text-3xl lg:font-semibold text-white">
            Know about Your Friends{" "}
            <div className="inline-block w-1 h-1 md:w-2 md:h-2 rounded-full bg-green-hard"></div>
          </h3>
          <span className="text-[10px] lg:text-xs text-gray-300 ">
            You have not Account?{" "}
            <Link to="/signup" className=" font-normal text-green-hard">
              Signup
            </Link>
          </span>
        </div>

        <div className="my-8 lg:my-13 w-[320px]  sm:w-[350px] md:w-[370px] lg:w-[380px]">

          <div className="w-full h-[40px] lg:h-[45px] mb-3 ">
            <input
              autoComplete="off"
              className="block  w-full h-full  px-4 md:px-5 lg:px-6 py-5  outline-none rounded-full bg-dark-surface text-white text-xs lg:text-sm placeholder:text-[10px] placeholder:lg:text-xs placeholder:text-gray-400 border-2 border-dark-surface focus:border-green-hard  "
              type="text"
              value={form.email}
              placeholder="Email or Username"
              onChange={handleFormChange}
              name="loggToken"
            />
          </div>
          <div className="relative mb-2 lg:mb-4 w-full h-[40px] lg:h-[45px]">
            <input
              autoComplete="off"
              className="block h-full w-full px-4 md:px-5 lg:px-6 py-5  outline-none rounded-full bg-dark-surface text-white text-xs lg:text-sm placeholder:text-[10px] placeholder:lg:text-xs placeholder:text-gray-400 border-2 border-dark-surface focus:border-green-hard  "
              type={passwordShow ? "text" : "password"}
              value={form.password}
              placeholder="Password"
              onChange={handleFormChange}
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

          <span className="text-[10px] lg:text-xs block mr-4 text-right text-white">
            Forget Password?{" "}
            <Link to="/forget-password" className="text-green-hard">
              Help
            </Link>
          </span>
          {error && (
            <span className="my-2  flex items-center gap-1 text-[10px] lg:text-xs  text-red-600">
              <MdError className="text-xs lg:text-sm" /> {error}
            </span>
          )}
          <Button
            onClick={handleSubmit}
            style=" my-4 "
            type="button"
            isLoading={isLoading}
          >
            Login Account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
