import { useState, type FC } from 'react';
import Logo from '..//..//Assets//login-Bg.png'
import Vetor from '..//..//Assets//Vector.png'
import google from '..//..//Assets//google.png'
import github from '..//..//Assets//github.png'
import sos from '..//..//Assets//SOS.png'
import { Link, useNavigate } from 'react-router-dom'
import { ErrorMessage, Field, Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';

interface RegisterProps { }
interface IFormValue {
    name: string,
    email: string,
    gender: string,
    password: string,
    repassword: string
}




const Register: FC<RegisterProps> = () => {
    const [check, setCheck] = useState(true);
    const url = `http://localhost:4000/auth/register`;
    const nevigate = useNavigate()
    const initialValues: IFormValue = {
        name: "",
        email: "",
        gender: "",
        password: "",
        repassword: "",
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        gender: Yup.string()
            .required('Gender is required')
            .oneOf(['male', 'female', 'other'], 'Invalid gender'),
        password: Yup.string().required('Password is required')
            .min(8, 'Password must be 8 characters long')
            .matches(/[0-9]/, 'Password requires a number')
            .matches(/[a-z]/, 'Password requires a lowercase letter')
            .matches(/[A-Z]/, 'Password requires an uppercase letter')
            .matches(/[^\w]/, 'Password requires a symbol'),
        repassword: Yup.string()
            .required('Please confirm your password')
            .oneOf([Yup.ref('password')], 'Passwords must match'),
    })
    const HandleSignup = (values: any) => {
        // console.log(values);
        axios.post(url, values)
            .then((response) => {
                console.log(response);
                setTimeout(() => {
                    if (response.status === 200) {
                        nevigate('/')
                    }
                }, 2000);
                toast.success('Register successfully')

            })
            .catch((error) => {
                console.log("Error occurred:", error);
                toast.error('User already exits')

            });
    }

    return (
        <>
            <div className='w-full h-screen'>
                <div className='w-full h-full md:flex'>
                    {/* left side  */}
                    <div className='w-[40%] pt-12 h-full bg-blue-700 hidden md:block overflow-hidden'>
                        <p className="text-white text-sm text-center">
                            Collect all your APIs in one place


                        </p>
                        <img className="w-full object-cover" src={Logo} alt="" />
                    </div>

                    {/* right side */}
                    <div className='md:w-[60%] h-full flex flex-col gap-1 w-full px-16'>
                        <div className=' w-full flex justify-between mt-4'>
                            <img src={Vetor} alt="" className='w-10' />
                            <div className='text-sm'>
                                Already Have An Account ?
                                <Link to='/' className='text-blue-600 mx-1'>
                                    LogIn
                                </Link>
                            </div>
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <h1 className="text-3xl font-medium">Welcome Back</h1>
                            <p className="text-xs font-medium">
                                Pleace enter following information to continue
                            </p>
                        </div>
                        {/* form */}
                        <Formik
                            onSubmit={HandleSignup}
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                        >
                            <Form>
                                <div>
                                    <div className="w-full h-[390px] overflow-y-scroll flex flex-col gap-4">
                                        <div className="flex  flex-col gap-1">
                                            <label htmlFor="name" className="font-medium">
                                                Name
                                            </label>
                                            <Field
                                                type="text"
                                                id="name"
                                                name='name'
                                                className="border-2 outline-none w-full py-1 px-2"
                                                placeholder="Enter Name "
                                            />
                                            <span className="text-red-500 text-sm"><ErrorMessage name="name" /></span>
                                        </div>



                                        <div className="flex flex-col gap-1">
                                            <label htmlFor="email" className="font-medium">
                                                Email
                                            </label>
                                            <Field
                                                type="text"
                                                id="email"
                                                name="email"
                                                className="border-2 outline-none w-full py-1 px-2"
                                                placeholder="Enter Email "
                                            />
                                            <span className="text-red-500 text-sm"><ErrorMessage name="email" /></span>
                                        </div>
                                        <div className="flex  flex-col gap-1">
                                            <label htmlFor="gender" className="font-medium">
                                                Gender
                                            </label>

                                            <Field
                                                className="py-2 border outline-none"
                                                id="gender"
                                                name="gender"
                                                as="select">

                                                <option value="chooche your gender">Chooche your gender</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                                <option value="other">Other</option>
                                            </Field>
                                            <span className="text-red-500 text-sm"><ErrorMessage name="gender" /></span>
                                        </div>

                                        <div className="flex flex-col gap-1">
                                            <label htmlFor="password" className="font-medium">
                                                Password
                                            </label>
                                            <Field
                                                type="password"
                                                id="password"
                                                name="password"
                                                className="border-2 outline-none w-full py-1 px-2"
                                                placeholder="Enter Password"
                                            />
                                            <span className="text-red-500 text-sm"><ErrorMessage name="password" /></span>
                                        </div>

                                        <div className="flex flex-col gap-1">
                                            <label htmlFor="repassword" className="font-medium">
                                                Confirm Password
                                            </label>
                                            <Field
                                                type="password"
                                                id="repassword"
                                                name="repassword"
                                                className="border-2 outline-none w-full py-1 px-2"
                                                placeholder="Enter RePassword"
                                            />
                                            <span className="text-red-500 text-sm"><ErrorMessage name="repassword" /></span>
                                        </div>
                                    </div>
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
                                    <div className="w-full flex justify-end">
                                        <button
                                            type='submit'
                                            disabled={check}
                                            className={`${check === false ? "bg-blue-600 " : "bg-blue-200"}
                                     py-2 text-white text-sm px-10 rounded-sm`}
                                        // onClick={Register}
                                        // className='bg-blue-200 px-5 py-2'
                                        >
                                            SIGNUP
                                        </button>
                                    </div>
                                </div>
                            </Form>
                        </Formik>
                        <div className="w-full relative border-b-2 flex justify-center">
                            <p className="absolute -top-3.5 bg-white px-2 text-sm font-medium">
                                or signup using
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



                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;
