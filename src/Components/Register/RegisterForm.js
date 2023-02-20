import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Company from "./Company";
import {DataContext} from '../Context/DataProvider'
import { useContext } from "react";
import SnackBar from "../Home/Tabs/TabsBody/SnackBar";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [companyCode, setCompanyCode] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyLogo, setCompanyLogo] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [check, setCheck] = useState(true);
  const {setMsg,setError }=useContext(DataContext);

  // const PasswordMatch=()=>{
  //   if(password === confirmPassword ){
  //     setMsg("Password Matched");
  //     setError(true)
  //   }else{
  //     setMsg("Oops !   Password Not Matched");
  //     setError(true)
  //   }
  // }
  // useEffect(()=>{
  //   PasswordMatch()
  // },[confirmPassword]);
  // const EmailValidation =()=>{
  //   var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  //   if(!email.match(mailformat)){
  //     setMsg("Please Enter a Valid Email");
  //     setError(true)
  //   }
  // }
  // useEffect(()=>{
  //   EmailValidation()
  // },[email])

  const navigate = useNavigate();

  const save = () => {

    let formData = { name, email, password };
    
    const postData = () => {
      if (company === "newCompany") {
        Object.assign(formData, {
          companyName: companyName.toUpperCase(),
          companyCode: companyCode,
          logo:companyLogo
        });
      } else {
        Object.assign(formData, {
          company
        });
      }
    };
    postData();

    axios
      .post(`http://localhost:4000/auth/register`, formData
      )
      .then((res) => {
        setMsg(res.data.message);
        setError(true)
        if (res.data) {
          setTimeout(() => {
            navigate("/");
            setError(false)
          }, 1000);
          
        } else {
          console.log("unauthorized");
        }
      })
      .catch((err) => {
        setMsg(err.response.data.message);
        setError(true)
      });
  };
  return (
    <>
      <div className="w-full h-full overflow-hidden overflow-y-scroll scrollbar-hide flex flex-col gap-5">
        <div className="flex  flex-col gap-1">
          <label htmlFor="name" className="font-medium">
            Name 
          </label>
          <input
            type="text"
            id="name"
            className="border-2 outline-none w-full py-1 px-2"
            placeholder="Enter Name "
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="font-medium">
            Email 
          </label>
          <input
            type="text"
            id="email"
            className="border-2 outline-none w-full py-1 px-2"
            placeholder="Enter Email "
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <Company
         setCompany={setCompany}
         setCompanyCode={setCompanyCode}
         setCompanyName={setCompanyName}
         setCompanyLogo={setCompanyLogo}
         />
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="border-2 outline-none w-full py-1 px-2"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="repassword" className="font-medium">
          Confirm Password
          </label>
          <input
            type="password"
            id="repassword"
            className="border-2 outline-none w-full py-1 px-2"
            placeholder="Enter RePassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </div>
        <div className="w-full flex justify-between">
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
        </div>
        <div className="w-full flex justify-end">
          <button
            disabled={check}
            className={`${check === false ? "bg-blue-600" : "bg-blue-200"}
            py-2 text-white text-sm px-10 rounded-sm`}
            onClick={save}
          >
            SIGNUP
          </button>
        </div>
        <SnackBar/>
    </>
  );
};

export default RegisterForm;
