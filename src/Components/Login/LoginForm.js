import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {AiOutlineEye,AiOutlineEyeInvisible,AiOutlineCloseCircle} from 'react-icons/ai'
import {motion} from 'framer-motion'
import {IoCheckmarkDoneCircleOutline} from 'react-icons/io5'


const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState(200);
  const [isLoding, setisLoding] = useState(false);
  const [check, setCheck] = useState(true);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const save = () => {
    axios
      .post(`http://localhost:4000/auth/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        setMsg(res.data.message)
        setErr(res.status)
        setisLoding(true)
        setTimeout(() => {
          setisLoding(false)
      }, 2000)
        sessionStorage.setItem("token", res.data.token);
        if (res.data.token) {
          setTimeout(() => {
            navigate("/workSpace");
        }, 2000)
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
        setErr(err.response.status)
        setisLoding(true)
        setTimeout(() => {
          setisLoding(false)
      }, 4000)
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
            type={open===true?'text':'password'}
            id="password"
            className="border-2 outline-none w-full py-1 px-2"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {open===true?<AiOutlineEye className="absolute bottom-2 cursor-pointer right-2 text-xl" onClick={()=>setOpen(!open)}/>:
          <AiOutlineEyeInvisible className="absolute bottom-2 cursor-pointer right-2 text-xl" onClick={()=>setOpen(!open)}/>
          }
          

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
          <a href="#" className="text-sm text-blue-600">
            Forget Password?
          </a>
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
        <div className="absolute bottom-2 left-2">
              {isLoding === true ? <motion.p
              initial={{opacity:0,}}
              animate={{opacity:1}}
              exit={{opacity:0}}
              className={`text-md  flex  items-center gap-2 font-semibold relative bg-gray-200 p-2 
              ${err === 200 ? 'text-green-600 border-b-2 border-emerald-400' : 'text-red-500 border-b-2 border-red-400'}`}>{msg}
                 {err === 200 ?<IoCheckmarkDoneCircleOutline className='text-2xl pt-1'/>:<AiOutlineCloseCircle className='text-2xl pt-1'/>}  </motion.p> : null}
           </div>
      </div>
    </>
  );
};

export default LoginForm;
