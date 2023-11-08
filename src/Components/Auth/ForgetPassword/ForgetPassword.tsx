import type { FC } from 'react';
import React, { useContext, useState } from 'react';
import Steeper from '../../Common/Steeper/Steeper';
import { CiMail } from 'react-icons/ci';
import { MdOutlineDone } from 'react-icons/md';
import { IoIosHelpCircleOutline } from 'react-icons/io';
import { AiFillLock, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import OtpInput from 'react-otp-input';
import http from '../../../Service/http';
import { MyContext } from '../../../Context/Context';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';

interface ForgetPasswordProps { }
export interface OTPInputProps {
    value: number | string;
    onChange: any;
    numInputs: number;
    separator?: JSX.Element | undefined;
    isDisabled?: boolean | undefined;
    shouldAutoFocus?: boolean | undefined;
    hasErrored?: boolean | undefined;
    isInputNum?: boolean | undefined;
    containerStyle?: string | React.CSSProperties | undefined;
    inputStyle?: string | React.CSSProperties | undefined;
    focusStyle?: string | React.CSSProperties | undefined;
    disabledStyle?: string | React.CSSProperties | undefined;
    errorStyle?: string | React.CSSProperties | undefined;
}
const ForgetPassword: FC<ForgetPasswordProps> = () => {
    const [activeStep, setActiveStep] = useState<number>(0)
    const [email, setEmail] = useState("");
    const { setMsg, setError, setStatus } = useContext(MyContext)
    const [otp, setOtp] = useState('');
    const [visible, setVisible] = useState(false);
    const [password, setPassword] = useState<any>("");
    const [conformPassword, setConformPassword] = useState<any>("");
    const steps = [
        { title: "Email", completed: activeStep > 0 },
        { title: "Otp", completed: activeStep > 1 },
        { title: "Password", completed: activeStep > 2 },
    ];
    const validate = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    // const handleNext = () => {
    //     if (activeStep < steps.length) {
    //         setActiveStep(activeStep + 1)
    //     }
    // };
    const handleBack = () => {
        setActiveStep((prevStep) => Math.max(prevStep - 1, 0));
    }

    // ===================== First step =====================
    const FirstStep = () => {
        http({
            method: "post",
            url: `${process.env.REACT_APP_BASEURL}/auth/otp`,
            data: {
                email: email,
            },
        })
            .then((res) => {
                if (activeStep < steps.length) {
                    setActiveStep(activeStep + 1)
                }
                setMsg(res.data.message);
                setStatus(res.status);
                setError(true);
            })
            .catch((err) => {
                setMsg(err.response.data.message);
                setStatus(err.response.status);
                setError(true);
                toast.error('Email Require')
            });
    };

    // ===================== Second step =====================
    const SecondStep = () => {
        http({
            method: "post",
            url: `${process.env.REACT_APP_BASEURL}/auth/verifyotp`,
            data: {
                email: email,
                otpCode: otp,
            },
        })
            .then((res) => {
                if (res.data.message === "OTP verified") {
                    if (activeStep < steps.length) {
                        setActiveStep(activeStep + 1)
                    }
                }
                toast.success(res.data.message);
                setMsg(res.data.message);
                setStatus(res.status);
                setError(true);
            })
            .catch((err) => {
                setMsg(err.response.data.message);
                setStatus(err.response.status);
                setError(true);
                console.log(err)
            });
    };

    // ===================== Second step =====================
    const ThirdStep = () => {
        http({
            method: "post",
            url: `${process.env.REACT_APP_BASEURL}/auth/forgetpassword`,
            data: {
                email: email,
                password: password,
            },
        })
            .then((res) => {
                if (password.match(conformPassword && password.length === conformPassword.length)) {
                    if (activeStep < steps.length) {
                        setActiveStep(activeStep + 1)
                    }
                    setMsg(res.data.message);
                    setStatus(res.status);
                    toast.success(res.data.message);
                    setError(true);
                }
            })
            .catch((err) => {
                setMsg(err.response.data.message);
                setStatus(err.response.status);
                setError(true);
            });
    };

    // ===================== incrementStep =====================
    const incrementStep = () => {
        activeStep === 0 && FirstStep();
        activeStep === 1 && otp.length === 4 && SecondStep();
        activeStep === 2 && ThirdStep();
    };

    return (
        <>
            <div className='w-full h-screen  pt-5'>
                <Link to={'/'} className='flex justify-end items-center gap-3 text-blue-600 pr-5 underline'> <BiArrowBack /> Back to Login</Link>
                {/* ========= Stepper Component ========= */}
                <div className="pr-[75px]"><Steeper steps={steps} activeStep={activeStep} /></div>
                <div className='w-full h-[400px] flex justify-center'>
                    {/*=============== Email verify =================*/}
                    {activeStep === 0 && (
                        <div className='w-[500px]'>
                            <div className="w-full pt-5 flex flex-col items-center mt-6 gap-5">
                                <div className="w-32 h-32 rounded-full bg-blue-300 flex justify-center items-center relative">
                                    <AiFillLock className="text-7xl text-blue-600" />
                                    <p className="absolute right-6 text-red-500 bottom-6 text-3xl">
                                        <IoIosHelpCircleOutline />
                                    </p>
                                </div>
                                <p className="text-gray-600 text-center text-sm tracking-wider font-medium px-5">
                                    Please Enter Your Email Address to Receive a
                                    verification Otp
                                </p>
                                <div className="relative z-0 w-full mb-6 group">
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className={`block py-1.5 w-full text-sm text-gray-600 bg-transparent border-0 border-b border-gray-700 appearance-none dark:border-gray-600 focus:outline-none focus:ring-0 peer ${email.match(validate)
                                            ? "border-blue-600"
                                            : "border-red-600"
                                            }`}
                                        placeholder=" "
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    {email.match(validate) && (
                                        <MdOutlineDone className="absolute right-0 top-3 cursor-pointer text-green-600" />
                                    )}
                                    <label
                                        htmlFor="email"
                                        className="font-medium absolute  text-gray-700 
                                    duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0
                                    peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                                    peer-focus:scale-75 peer-focus:-translate-y-6 text-sm"
                                    >
                                        Email Address{" "}
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* ===============Otp verify ===========*/}
                    {activeStep === 1 && (
                        <>
                            <div className="w-[500px] pt-5 flex flex-col items-center mt-6 gap-5 ">
                                <div className="w-32 h-32 rounded-full bg-blue-300 flex justify-center items-center ">
                                    <CiMail className="text-7xl text-blue-500" />
                                </div>
                                <p className="text-gray-600 text-center text-sm tracking-wider font-medium">
                                    Please Enter The 4 Digit Code Sent To{" "}
                                    <span className="text-blue-500">{email}</span>
                                </p>
                                <div className=''>
                                    <OtpInput
                                        value={otp}
                                        onChange={setOtp}
                                        numInputs={4}
                                        renderSeparator={<span>-</span>}
                                        renderInput={(props, index) => (
                                            <input
                                                {...props}
                                                style={{
                                                    width: '30px',
                                                    height: '40px',
                                                    border: '1px solid #ccc',
                                                    borderRadius: '2px',
                                                    padding: '10px'
                                                }}
                                            />
                                        )}
                                    />
                                </div>
                            </div>
                        </>
                    )}
                    {/*  */}
                    {activeStep === 2 && (
                        <>
                            <div className="w-[500px] pt-5 flex flex-col items-center mt-6 gap-5 ">
                                <div className="w-32 h-32 rounded-full bg-blue-300 flex justify-center items-center relative">
                                    <AiFillLock className="text-7xl text-blue-500" />
                                    <p
                                        className="absolute right-7 text-green-500 bottom-6 w-6 h-6 border-2 rounded-full 
                      flex justify-center items-center border-green-500"
                                    >
                                        <MdOutlineDone className="text-2xl" />
                                    </p>
                                </div>
                                <p className="text-gray-600 text-center text-sm tracking-wider font-medium px-5">
                                    Your New Password Must Be Different from Previously Used
                                    Password
                                </p>
                                {/* new password */}
                                <div className="relative z-0 w-full mb-3 group">
                                    <input
                                        type={visible === true ? "text" : "password"}
                                        name="password"
                                        id="password"
                                        className="block py-1.5 w-full text-sm
                       text-gray-600 bg-transparent border-0 border-b border-gray-700 appearance-none 
                       dark:border-gray-600 focus:outline-none focus:ring-0
                        focus:border-blue-600 peer"
                                        placeholder=" "
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                        }}
                                    />
                                    <label
                                        htmlFor="password"
                                        className="font-medium absolute  text-gray-700 
                           duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] 
                           peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                           peer-focus:scale-75 peer-focus:-translate-y-6 text-sm"
                                    >
                                        New Password{" "}
                                    </label>
                                    {visible === true ? (
                                        <AiOutlineEye
                                            className="absolute right-0 top-3 cursor-pointer"
                                            onClick={() => setVisible(!visible)}
                                        />
                                    ) : (
                                        <AiOutlineEyeInvisible
                                            className="absolute right-0 top-3 cursor-pointer"
                                            onClick={() => setVisible(!visible)}
                                        />
                                    )}
                                </div>
                                {/* conform Password */}
                                <div className="relative z-0 w-full mb-6 group">
                                    <input
                                        type="password"
                                        name="conformPassword"
                                        id="conformPassword"
                                        className="block py-1.5 w-full text-sm
                       text-gray-600 bg-transparent border-0 border-b border-gray-700 appearance-none 
                       dark:border-gray-600 focus:outline-none focus:ring-0  focus:border-blue-600 peer"
                                        placeholder=" "
                                        onChange={(e) => setConformPassword(e.target.value)} />
                                    <label
                                        htmlFor="conformPassword"
                                        className="font-medium absolute  text-gray-700 
                      duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0
                       peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                        peer-focus:scale-75 peer-focus:-translate-y-6 text-sm"
                                    >
                                        Conform Password
                                    </label>
                                    {password.match(conformPassword) ? setMsg('Password Match') : setMsg('Not Match Password !')}
                                    {password.match(conformPassword) && setError(true)}
                                    {password.match(conformPassword) ? setStatus(200) : setStatus(400)}
                                </div>
                            </div>
                        </>
                    )}
                </div>
                {/* ========= Button ========= */}
                <div className="mt-4 gap-[390px] flex justify-center">
                    <button
                        onClick={handleBack}
                        disabled={activeStep === 0}
                        className="bg-blue-500 text-white py-2 px-4 rounded-md disabled:bg-blue-400"
                    >
                        Back
                    </button>
                    <button
                        // onClick={handleNext}
                        onClick={incrementStep}
                        disabled={activeStep === steps.length}
                        className="bg-blue-500 text-white py-2 px-4 rounded-md disabled:bg-blue-400"
                    >
                        Next
                    </button>
                </div>
            </div>
        </>
    );
}

export default ForgetPassword;
