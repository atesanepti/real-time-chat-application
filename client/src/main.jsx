import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "./index.css";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import store from "./redux/store.js";
import AccountVerify from "./pages/AccountVerify.jsx";
import Protected from "./components/Protected.jsx";
import Chat from "./pages/Chat.jsx";
import Profile from "./pages/Profile.jsx";
import Setting from "./pages/Setting";
import ForgetPassword from "./pages/ForgetPassword.jsx";
import VerifyOTP from "./pages/VerifyOTP";
import { UserProfile } from "./pages/UserProfile.jsx";
import RequestChat from './pages/RequestChat';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Protected />,
        children: [
          {
            path: "chat",
            element: <Chat />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "setting",
            element: <Setting />,
          },
          {
            path: "user/:id",
            element: <UserProfile />,
          },
          {
            path: "request-messages",
            element: <RequestChat />,
          },
        ],
      },

      {
        path: "login",
        element: <Login />,
      },

      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "forget-password",
        element: <ForgetPassword />,
        children: [
          {
            path: "verify",
            element: <VerifyOTP />,
          },
        ],
      },

      {
        path: "account-verify",
        element: <AccountVerify />,
      },
      {
        path: "/",
        element: <Home />,
        index: true,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
