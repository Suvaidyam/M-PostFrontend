import { FC, useContext } from 'react';
import { IoIosArrowRoundBack, IoIosHelpCircleOutline } from "react-icons/io";
import {
    AiFillLock,
    AiOutlineEye,
    AiOutlineEyeInvisible,
} from "react-icons/ai";
import {MdClose} from 'react-icons/md'
import { MyContext } from '../../../Context/Context';

interface ForgetPasswordProps { }

const ForgetPassword: FC<ForgetPasswordProps> = () => {
    const { setForgetPasswordPopup}: any = useContext(MyContext)
    return (
        <>
            <div className='w-full h-screen p-4 inset-0 bg-gray-500 bg-opacity-75 transition-opacity absolute top-0 flex justify-center'>
                <div className='w-[470px] h-full  bg-white p-2 rounded-md drop-shadow-lg'>
                    <div className='w-full flex items-center justify-between cursor-pointer'>
                        <p className='text-3xl'><IoIosArrowRoundBack /></p>
                        <p className='text-mg text-gray-700 font-medium'>Recover Password</p>
                    </div>
                    <div className='w-full flex flex-col justify-center items-center px-10 gap-5'>
                        <div className='w-32 h-32 rounded-full bg-[#93c5fd] relative flex justify-center items-center p-5'>
                            <span><AiFillLock className='text-7xl text-blue-600' /></span>
                            <span className='absolute right-6 bottom-6 text-red-600 text-3xl'><IoIosHelpCircleOutline /></span>
                        </div>
                        <p className='text-center text-sm text-gray-600 font-semibold tracking-wider'>Please Enter Your Email Address to Recieve a verifycation Otp</p>
                        <div className='w-full'>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className='block py-1.5 w-full text-sm text-gray-600 bg-transparent border-0 border-b border-gray-700 appearance-none dark:border-gray-600 focus:outline-none focus:ring-0'
                                placeholder=" "
                            />
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
                <div onClick={()=>setForgetPasswordPopup(false)} className='w-10 h-10 rounded-full bg-[#93c5fd] flex justify-center items-center'><MdClose className='text-2xl'/></div>
            </div>
        </>
    );
}

export default ForgetPassword;


