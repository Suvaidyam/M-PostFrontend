import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";

import { DataContext } from "../Context/DataProvider";

const LoginForm = () => {
  const {setMsg,setError, setStatus }=useContext(DataContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [check, setCheck] = useState(true);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const save = () => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/auth/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        setMsg(res.data.message);
        setError(true)
        setStatus(res.status)
        sessionStorage.setItem("token", res.data.token);
        if (res.data.token) {
          setTimeout(() => {
            navigate("/workSpace/collection");
            setError(false)
          }, 2000);
          let token = res.data.token;
          let payload = token.split(".");
          let data = atob(payload[1]);
          // dispatch(ProfileDetailsAction(data))

          sessionStorage.setItem("paylode", data);
        } else {
          console.log("unauthorized");
        }
      })
      .catch((err) => {
        setMsg(err.response.data.message);
        setError(true);
        setStatus(err.response.status)
      });
  };
  return (
    <>
      <div className="w-full flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="font-medium">
            Email or Usename
          </label>
          <input
            type="text"
            id="email"
            className="border-2 outline-none w-full py-1 px-2"
            placeholder="Enter Email or Username"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1 relative">
          <label htmlFor="password" className="font-medium">
            Password
          </label>
          <input
            type={open === true ? "text" : "password"}
            id="password"
            className="border-2 outline-none w-full py-1 px-2"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {open === true ? (
            <AiOutlineEye
              className="absolute bottom-2 cursor-pointer right-2 text-xl"
              onClick={() => setOpen(!open)}
            />
          ) : (
            <AiOutlineEyeInvisible
              className="absolute bottom-2 cursor-pointer right-2 text-xl"
              onClick={() => setOpen(!open)}
            />
          )}
        </div>
        <div className="flex justify-between">
          <div className="flex items-center gap-1">
            <input
              type="checkbox"
              id="check"
              className="border-2 outline-none"
              placeholder="Enter Password"
              onClick={() => setCheck(!check)}
            />
            <label htmlFor="check" className="text-sm cursor-pointer">
              I agree with{" "}
              <span className="text-red-500">terms & conditions</span>
            </label>
          </div>
          <Link to='#' className="text-sm text-blue-600">
            Forget Password?
          </Link>
        </div>
        <div className="w-full flex justify-end">
          <button
            disabled={check}
            className={`${check === false ? "bg-blue-600" : "bg-blue-200"}
            py-2 text-white text-sm px-10 rounded-sm`}
            onClick={save}
          >
            LOGIN
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
