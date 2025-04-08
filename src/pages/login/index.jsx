import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateToken } from "../../redux/slices/auth";
import { Navigate, useNavigate } from "react-router-dom";
import "../../styles/login.css";
import useDebounce from "../../hooks/useDebounce";
import useThrottle from "../../hooks/useThrottle";

const Login = () => {
  const [toggleScreen, setToggleScreen] = useState("signin");
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      username: e.target.username.value,
      password: e.target.password.value,
    };
    console.log(data);
    dispatch({
      type: "api/call",
      payload: {
        url: "/auth/login",
        data: data,
        method: "POST",
        onSuccess: updateToken,
        onFail: (error) => console.log(error),
        headers: {},
      },
    });
    console.log(data);
    e.target.reset();
  };
  const handleCardAnimation = () => {
    setToggleScreen((prev) => (prev === "signin" ? "signup" : "signin"));
    let formElement = document.querySelector(".form-cover");
    formElement.classList.add("animateMe");
    setTimeout(() => {
      formElement.classList.remove("animateMe");
    }, 600);
  };

  const myDebouncedAnimation = useThrottle(handleCardAnimation, 700);

  if (token) {
    return <Navigate to="/products" />;
  }

  console.log("toggleScreen", toggleScreen);
  return (
    <div className="flex h-screen w-screen border-21 justify-center items-center">
      <div className="flex w-content">
        <div
          className="flex flex-col form-cover transition delay-200 duration-300 ease-in-out h-150 justify-center min-w-100 w-full items-center"
          style={{
            transform:
              toggleScreen === "signin" ? "translateX(0%)" : "translateX(100%)",
          }}
        >
          {toggleScreen === "signin" ? (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5 w-full p-10 relative z-1"
            >
              <p className="text-6xl font-bold relative">Sign In</p>
              <div className="flex flex-col gap-2">
                <label
                  className="text-sm font-bold uppercase"
                  htmlFor="username "
                >
                  Username
                </label>
                <input
                  className="border rounded-full w-full h-10 px-2 text-xs"
                  id="username"
                  value={"johnd"}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  className="text-sm font-bold uppercase"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="border rounded-full w-fukk h-10 px-2 text-xsa"
                  id="password"
                  type="password"
                  value={"m38rmF$"}
                />
              </div>
              <div className="flex gap-5 justify-center">
                <button
                  className="border-2 uppercase rounded-full w-min text-nowrap px-8 py-2  cursor-pointer hover:border-red-300"
                  type="submit"
                >
                  Sign in
                </button>
              </div>
            </form>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5 w-full p-10 relative z-1 "
            >
              <p className="text-6xl font-bold relative">Sign Up</p>
              <div className="flex flex-col gap-2">
                <label
                  className="text-sm font-bold uppercase"
                  htmlFor="username "
                >
                  Name
                </label>
                <input
                  className="border rounded-full w-full h-10 px-2 text-xs"
                  id="username"
                  value={"johnd"}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  className="text-sm font-bold uppercase"
                  htmlFor="password"
                >
                  Email
                </label>
                <input
                  className="border rounded-full w-fukk h-10 px-2 text-xsa"
                  id="password"
                  type="password"
                  value={"m38rmF$"}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  className="text-sm font-bold uppercase"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="border rounded-full w-fukk h-10 px-2 text-xsa"
                  id="password"
                  type="password"
                  value={"m38rmF$"}
                />
              </div>
              <div className="flex gap-5 justify-center ">
                <button
                  className="border-2 uppercase text-nowrap rounded-full w-min px-8 py-2  cursor-pointer hover:border-red-300 "
                  type="submit"
                >
                  Sign up
                </button>
              </div>
            </form>
          )}
        </div>
        <div
          id="greeting"
          className={`w-full transition delay-200 duration-300 ease-in-out min-w-100 gap-15 p-10 h-150 flex flex-col justify-center`}
          style={{
            transform:
              toggleScreen === "signin"
                ? "translateX(0%)"
                : "translateX(-100%) ",
            backgroundImage:
              toggleScreen === "signin"
                ? `radial-gradient(circle at 25% 25%, #fdfbd4 , #ffe688 )`
                : "radial-gradient(circle at 75% 75%, #fdfbd4, #ffe688 )",
          }}
        >
          <div className="flex flex-col gap-4">
            <div className="relative">
              <p
                className={`text-6xl absolute font-bold transition-opacity duration-200 ${
                  toggleScreen === "signin"
                    ? "delay-500 opacity-100"
                    : "opacity-0"
                }`}
              >
                Hello, Friend!
              </p>
              <p
                className={`text-6xl font-bold transition-opacity duration-200 ${
                  toggleScreen === "signin"
                    ? "opacity-0"
                    : "delay-500 opacity-100"
                }`}
              >
                Welcome Back!
              </p>
            </div>
            <div className="relative">
              <p
                className={`text-2xl absolute font-thin transition-opacity duration-200 ${
                  toggleScreen === "signin"
                    ? "delay-500 opacity-100"
                    : "opacity-0"
                }`}
              >
                Enter your personal details and start shopping today
              </p>
              <p
                className={`text-2xl font-thin transition-opacity duration-200 ${
                  toggleScreen === "signin"
                    ? "opacity-0"
                    : "delay-500 opacity-100"
                }`}
              >
                To keep connected with us please login with your personal Info
              </p>
            </div>
          </div>
          <div className="relative self-center">
            <button
              className={`uppercase absolute hover:cursor-pointer border rounded-full w-30 h-10 border-red self-center ${
                toggleScreen === "signin"
                  ? "opacity-0"
                  : "delay-500 opacity-100"
              }`}
              onClick={(e) => {
                myDebouncedAnimation();
              }}
            >
              {toggleScreen === "signin" ? "sign up" : "sign in"}
            </button>
            <button
              className={`uppercase hover:cursor-pointer border rounded-full w-30 h-10 border-red self-center ${
                toggleScreen === "signin"
                  ? "delay-500 opacity-100"
                  : "opacity-0"
              }`}
              onClick={(e) => {
                myDebouncedAnimation();
              }}
            >
              {toggleScreen === "signin" ? "sign up" : "sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
