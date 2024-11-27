import { Link, useLocation } from "react-router-dom";

const Nav = () => {
  const path = useLocation();
  return (
    <div className="flex items-center gap-10 md:gap-11 lg:gap-16">
      <div className="flex items-center gap-4 md:gap-5 lg:gap-6">
        <div className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 rounded-full bg-green-hard"></div>
        <span className="text-white text-sm font-medium md:text-base  lg:font-semibold">
          Ethinc Chat
        </span>
      </div>
      <nav className="flex gap-4 md:gap-6 lg:gap-7">
        <Link to="/" className="text-gray-400 text-xs md:text-sm font-medium">
          Home
        </Link>
        {path.pathname == "/signup" ? (
          <Link
            to="/login"
            className="text-gray-400 text-xs md:text-sm font-medium"
          >
            Login
          </Link>
        ) : (
          <Link
            to="/signup"
            className="text-gray-400 text-xs md:text-sm font-medium"
          >
            Signup
          </Link>
        )}
      </nav>
    </div>
  );
};

export default Nav;
