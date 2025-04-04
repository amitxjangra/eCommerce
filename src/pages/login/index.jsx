import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateToken } from "../../redux/slices/auth";
import { Navigate, useNavigate } from "react-router-dom";
const Login = () => {
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

  if (token) {
    return <Navigate to="/products" />;
  }
  return (
    <div className="flex h-screen border justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="border flex flex-col w-min h-min px-20 py-10 rounded-[15px] gap-5 "
      >
        <div className="flex flex-col gap-2">
          <label className="text-sm" htmlFor="username ">
            UserName
          </label>
          <input
            className="border rounded-full w-full h-8 px-2 text-xs"
            id="username"
            value={"johnd"}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm" htmlFor="password">
            Password
          </label>
          <input
            className="border rounded-full w-fukk h-8 px-2 text-xsa"
            id="password"
            type="password"
            value={"m38rmF$"}
          />
        </div>
        <div className="flex gap-5 ">
          <button
            className="border-2 rounded-full w-min px-8 py-2  cursor-pointer hover:border-red-300"
            type="submit"
          >
            Login
          </button>
          <button
            onClick={() => {
              navigate("/products");
            }}
            className="border-2 rounded-full w-content px-8 cursor-pointer hover:border-red-300"
          >
            Forgot Password
          </button>
          <button
            className="border-2 rounded-full w-content text-nowrap px-8 cursor-pointer hover:border-red-300"
            type="submit"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
