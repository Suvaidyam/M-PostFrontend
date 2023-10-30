import { useState, useContext, type FC } from 'react';
import Logo from '..//..//Assets//login-Bg.png'
import Vetor from '..//..//Assets//Vector.png'
import google from '..//..//Assets//google.png'
import github from '..//..//Assets//github.png'
import sos from '..//..//Assets//SOS.png'
import { Link, useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import {
    AiOutlineEye,
    AiOutlineEyeInvisible,
} from "react-icons/ai";
import ForgetPassword from '../ForgetPassword/ForgetPassword';
import { MyContext } from '../../../Context/Context';
import axios from 'axios';
import { toast } from 'react-toastify';
interface LoginProps { }
interface IFormValue {
    email: string,
    password: string,
}
const Login: FC<LoginProps> = (data: {}) => {
    const [open, setOpen] = useState<boolean>(false);
    const [check, setCheck] = useState(true);
    const { forgetPasswordPopup, setForgetPasswordPopup }: any = useContext(MyContext)
    const initialValues: IFormValue = {
        email: '',
        password: ''
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().required('Password is required')
    })

    const navigate = useNavigate();

    const handleLogin = (values: IFormValue) => {
        axios.post(`http://localhost:4000/auth/login`, values)
            .then((response: any) => {
                console.log(response)
                setTimeout(() => {
                    if (response.status === 200) {
                        sessionStorage.setItem('token', response.data.token)
                        navigate('/workspace')
                    }
                }, 2000);
                let token = response.data.token;
                let payload = token.split(".");
                let data = atob(payload[1]);
                sessionStorage.setItem("paylode", data);
                toast.success(response.data.message)
            })
            .catch((error) => {
                console.log("Error occurred:", error);
                toast.error('Invalid user')

            });
    }
    return (
        <>
            <div className='w-full h-screen'>
                <div className='w-full h-full md:flex'>
                    {/* left */}
                    <div className='md:w-[60%] h-full flex flex-col justify-center gap-4 px-16'>
                        <div className=' w-full flex justify-between'>
                            <img src={Vetor} alt="" className='w-10' />
                            <div className='text-sm'>
                                New user ?
                                <Link to='/register' className='text-blue-600 mx-1'>
                                    Sign Up
                                </Link>
                            </div>
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <h1 className="text-3xl font-medium">Welcome Back</h1>
                            <p className="text-xs font-medium">
                                Please enter following information to continue
                            </p>
                        </div>
                        <div>
                            <Formik
                                initialValues={initialValues}
                                onSubmit={handleLogin}
                                validationSchema={validationSchema}
                            >
                                <Form className='mt-10 flex gap-5 flex-col'>
                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="email" className="font-medium">
                                            Email or Username
                                        </label>
                                        <Field
                                            type="text"
                                            id="email"
                                            name="email"
                                            className="border-2 outline-none w-full py-1 px-2"
                                            placeholder="Enter Email or Username"
                                        // onChange={() => setEmail(e.target.value)}
                                        />
                                        <span className='text-red-400 font-semibold text-[12px]'><ErrorMessage name='email' /></span>
                                    </div>
                                    <div className="flex flex-col gap-1 relative">
                                        <label htmlFor="email" className="font-medium">
                                            Password
                                        </label>
                                        <Field
                                            type={open === true ? "text" : "password"}
                                            id="password"
                                            name="password"
                                            className="border-2 outline-none w-full py-1 px-2"
                                            placeholder="Enter Email or Username"
                                        // onChange={() => setPassword(e.target.value)}
                                        />
                                        <span className='text-red-400 font-semibold text-[12px]'><ErrorMessage name='password' /></span>
                                        {open === true ? (
                                            <AiOutlineEyeInvisible
                                                className="absolute top-9 cursor-pointer right-2 text-xl"
                                                onClick={() => setOpen(!open)}
                                            />
                                        ) : (
                                            <AiOutlineEye
                                                className="absolute top-9 cursor-pointer right-2 text-xl"
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
                                        <p
                                            onClick={() => setForgetPasswordPopup(true)}
                                            className="text-sm text-blue-600 cursor-pointer">Forget Password?</p>
                                        {forgetPasswordPopup && <ForgetPassword />}

                                    </div>
                                    <div className="w-full flex justify-end">
                                        <button
                                            type='submit'
                                            disabled={check}
                                            className={`${check === false ? "bg-blue-600" : "bg-blue-200"}
                                      py-2 text-white text-sm px-10 rounded-sm`}
                                        // onClick={save}
                                        // className='bg-blue-200 py-2 px-8'
                                        >
                                            LOGIN
                                        </button>
                                    </div>
                                    <div className="w-full relative border-b-2 flex justify-center -z-30 ">
                                        <p className="absolute -top-3.5 bg-white px-2 text-sm font-medium -z-30">
                                            or login using
                                        </p>
                                    </div>
                                    <div className='w-full flex justify-center gap-2'>
                                        <div className="w-10 h-10 border flex justify-center items-center p-2 cursor-pointer rounded-full">
                                            <img src={google} alt="" />
                                        </div>
                                        <div className="w-10 h-10 border flex justify-center items-center p-2 cursor-pointer rounded-full">
                                            <img src={github} alt="" />
                                        </div>
                                        <div className="w-10 h-10 border flex justify-center items-center p-2 cursor-pointer rounded-full">
                                            <img src={sos} alt="" />
                                        </div>
                                    </div>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                    {/* left end */}

                    {/* right */}
                    <div className='w-[40%] pt-7 h-full  bg-blue-600 hidden md:block'>
                        <p className="text-white text-xl text-center">
                            Collect all your APIs <br /> in one place
                        </p>
                        <img className="w-full object-cover" src={Logo} alt="" />
                    </div>

                    {/* right end */}
                </div>
            </div>
        </>
    );
}

export default Login;
