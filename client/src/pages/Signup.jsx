import { Link } from "react-router-dom";
import Nav from "./../components/Nav";
import { useEffect, useState } from "react";
import { MdError } from "react-icons/md";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import Button from "./../components/Button";

import { useCreateUserMutation } from "../redux/api/userApiSlice.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Signup = () => {
  const { user } = useSelector((state) => state.authR);
  const [form, setForm] = useState({
    name: "",
    email: "",
    userName: "",
    password: "",
    confirmPassword: "",
    userImage: "",
  });
  const [error, setError] = useState();
  const [passwordShow, setPasswordShow] = useState(false);
  const [passwordConShow, setConPasswordShow] = useState(false);
  const navigate = useNavigate();
  const handleFormChangle = (e) => {
    const { value, name } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleImageChange = (e) => {
    setForm((prev) => ({ ...prev, userImage: e.target.files[0] }));
  };

  const [createUserApi, { isLoading: createUserLoading, error: createError }] =
    useCreateUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name) {
      return setError("Name is required");
    } else if (!form.userName) {
      return setError("User nameis required");
    } else if (!form.email) {
      return setError("Email address is required");
    } else if (!form.password || !form.confirmPassword) {
      return setError("Password is required");
    }

    if (form.password !== form.confirmPassword) {
      return setError("Confirm password does not match");
    }

    const formData = new FormData();
    for (let key in form) {
      formData.append(key, form[key]);
    }

    try {
      const res = await createUserApi(formData).unwrap();
      navigate("/account-verify", { state: res });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (createError) {
      setError(createError.data.error);
    }
  }, [createError]);
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
          <h5 className="text-xs font-semibold uppercase text-gray-300">
            START FOR FREE
          </h5>
          <h3 className="text-xl my-1 lg:my-2 font-medium md:text-base lg:text-3xl lg:font-semibold text-white">
            Create new account{" "}
            <div className="inline-block w-1 h-1 md:w-2 md:h-2 rounded-full bg-green-hard"></div>
          </h3>
          <span className="text-[10px] lg:text-xs text-gray-300 ">
            Alrady have an account?{" "}
            <Link to="/login" className=" font-normal text-green-hard">
              Login
            </Link>
          </span>
        </div>

        <div className="w-[320px]  sm:w-[350px] md:w-[370px] lg:w-[380px]  ">
          <form onSubmit={handleSubmit} className="my-8 lg:my-13">
            <div className="flex items-center gap-2 md:gap-3 lg:gap-4 mb-3 ">
              <input
                autoComplete="off"
                className="block w-full h-[40px] lg:h-[45px] px-4 md:px-5 lg:px-6 py-5  outline-none rounded-full bg-dark-surface text-white text-xs lg:text-sm placeholder:text-[10px] placeholder:lg:text-xs placeholder:text-gray-400 border-2 border-dark-surface focus:border-green-hard  "
                type="text"
                value={form.name}
                placeholder="Name"
                onChange={handleFormChangle}
                name="name"
              />
              <input
                autoComplete="off"
                className="block w-full h-[40px] lg:h-[45px] px-4 md:px-5 lg:px-6 py-5  outline-none rounded-full bg-dark-surface text-white text-xs lg:text-sm placeholder:text-[10px] placeholder:lg:text-xs placeholder:text-gray-400 border-2 border-dark-surface focus:border-green-hard  "
                type="text"
                value={form.userName}
                placeholder="User Name"
                onChange={handleFormChangle}
                name="userName"
              />
            </div>

            <div className="w-full h-[40px] lg:h-[45px] mb-3">
              <input
                autoComplete="off"
                className=" block w-full h-full  px-4 md:px-5 lg:px-6 py-5  outline-none rounded-full bg-dark-surface text-white text-xs lg:text-sm placeholder:text-[10px] placeholder:lg:text-xs placeholder:text-gray-400 border-2 border-dark-surface focus:border-green-hard  "
                type="email"
                value={form.email}
                placeholder="Email"
                onChange={handleFormChangle}
                name="email"
              />
            </div>

            <div className="flex items-center justify-between gap-2 md:gap-3 lg:gap-4 mb-3">
              <div className="relative flex-1  w-full h-[40px] lg:h-[45px]">
                <input
                  autoComplete="off"
                  className="block w-full h-full px-4 md:px-5 lg:px-6 py-5  outline-none rounded-full bg-dark-surface text-white text-xs lg:text-sm placeholder:text-[10px] placeholder:lg:text-xs placeholder:text-gray-400 border-2 border-dark-surface focus:border-green-hard  "
                  type={passwordShow ? "text" : "password"}
                  value={form.password}
                  placeholder="Password"
                  onChange={handleFormChangle}
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

              <div className="relative flex-1  w-full h-[40px] lg:h-[45px]">
                <input
                  autoComplete="off"
                  className="block   w-full h-full px-4 md:px-5 lg:px-6 py-5  outline-none rounded-full bg-dark-surface text-white text-xs lg:text-sm placeholder:text-[10px] placeholder:lg:text-xs placeholder:text-gray-400 border-2 border-dark-surface focus:border-green-hard  "
                  type={passwordConShow ? "text" : "password"}
                  value={form.confirmPassword}
                  placeholder="Confirm Password"
                  onChange={handleFormChangle}
                  name="confirmPassword"
                />
                <div
                  onClick={() => setConPasswordShow(!passwordConShow)}
                  className="absolute top-1/2 translate-y-[-50%] right-4 cursor-pointer text-white"
                >
                  {passwordConShow ? (
                    <FaRegEyeSlash className="text-xs lg:text-sm" />
                  ) : (
                    <FaRegEye className="text-xs lg:text-sm" />
                  )}
                </div>
              </div>
            </div>

            <div className="w-full h-[40px] lg:h-[45px] mb-3">
              <input
                className="w-full h-full pt-2 px-4 outline-none rounded-full bg-dark-surface text-white text-xs lg:text-sm placeholder:text-[10px] placeholder:lg:text-xs placeholder:text-gray-400 border-2 border-dark-surface focus:border-green-hard  "
                type="file"
                onChange={handleImageChange}
                name="image"
              />
            </div>

            {error && (
              <span className="my-2  flex items-center gap-1 text-[10px] lg:text-xs  text-red-600">
                <MdError className="text-xs lg:text-sm" /> {error}
              </span>
            )}
            <Button isLoading={createUserLoading} type="submit">
              Create Account
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
