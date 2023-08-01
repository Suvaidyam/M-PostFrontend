import type { FC } from 'react';
import { IoIosArrowRoundBack, IoIosHelpCircleOutline } from "react-icons/io";

interface ForgetPasswordProps {}

const ForgetPassword: FC<ForgetPasswordProps> = () => {
    return (
        <>
        <div className='w-full h-screen p-4 inset-0 bg-gray-500 bg-opacity-75 transition-opacity absolute top-0 flex flex-col justify-center items-center'>
            <div className='w-[470px] h-full  bg-white p-2 rounded-md drop-shadow-lg'>
               <div className='w-full'>
                    <p></p>
               </div>
            </div>
        </div>
        </>
    );
}

export default ForgetPassword;
