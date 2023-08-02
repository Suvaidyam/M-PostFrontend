import { FC, useContext } from 'react';
import { IoIosArrowRoundBack, IoIosHelpCircleOutline } from "react-icons/io";
import StepProgressBar from 'react-step-progress';
import 'react-step-progress/dist/index.css';
import {
    AiFillLock,
    AiOutlineEye,
    AiOutlineEyeInvisible,
} from "react-icons/ai";
import { MdClose } from 'react-icons/md'
import { MyContext } from '../../../Context/Context';
import {MdOutlineDone} from 'react-icons/md'
import {CiMail} from 'react-icons/ci'
import  './forget.css';

interface ForgetPasswordProps { }

const ForgetPassword: FC<ForgetPasswordProps> = () => {
    const { setForgetPasswordPopup }: any = useContext(MyContext)
    const step1Content =  <div className='w-full flex flex-col justify-center items-center px-2 pt-8 gap-5'>
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
</div>;
    const step2Content =   <div className="w-full pt-5 flex flex-col items-center mt-6 gap-5 ">
    <div className="w-32 h-32 rounded-full bg-blue-300 flex justify-center items-center ">
      <CiMail className="text-7xl text-blue-500" />
    </div>
    <p className="text-gray-600 text-center text-sm tracking-wider font-medium px-5">
      Please Enter The 4 Digit Code Sent To{" "}
      <span className="text-blue-500">hdgfj.gmail.com</span>
    </p>
    {/* <OTPInput
      value={OTP}
      onChange={setOTP}
      autoFocus
      OTPLength={4}
      otpType="number"
      disabled={false}
    />
    <ResendOTP
      onResendClick={() => console.log("Resend clicked")}
    /> */}
  </div>;
    const step3Content =  <div className="w-full pt-5 flex flex-col items-center mt-6 gap-5 ">
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
      Your New Password Must Be Differnt from Previously Used
      Password
    </p>
    {/* new password */}
    <div className="relative z-0 w-full mb-3 group">
      <input
        // type={vissiable === true ? "text" : "password"}
        name="password"
        id="password"
        className="block py-1.5 w-full text-sm
     text-gray-600 bg-transparent border-0 border-b border-gray-700 appearance-none 
     dark:border-gray-600 focus:outline-none focus:ring-0
      focus:border-blue-600 peer"
        placeholder=" "
        onChange={(e) => {
        //   setPassword(e.target.value);
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
      {true ? (
        <AiOutlineEye
          className="absolute right-0 top-3 cursor-pointer"
        //   onClick={() => setvissiable(!vissiable)}
        />
      ) : (
        <AiOutlineEyeInvisible
          className="absolute right-0 top-3 cursor-pointer"
        //   onClick={() => setvissiable(!vissiable)}
        />
      )}
    </div>
    {/* confrom Password */}
    <div className="relative z-0 w-full mb-6 group">
      <input
        type="password"
        name="confrompassword"
        id="confrompassword"
        className="block py-1.5 w-full text-sm
     text-gray-600 bg-transparent border-0 border-b border-gray-700 appearance-none 
     dark:border-gray-600 focus:outline-none focus:ring-0  focus:border-blue-600 peer"
        placeholder=" "
    //   onChange={(e)=>setConformPassword(e.target.value)}
      />
      <label
        htmlFor="confrompassword"
        className="font-medium absolute  text-gray-700 
    duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0
     peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
      peer-focus:scale-75 peer-focus:-translate-y-6 text-sm"
      >
        Confrom Password
      </label>
     {/* {password.match(conformPassword) ? setMsg('Password Match'): setMsg('Not Match Password !')}
     {password.match(conformPassword) && setError(true)}
     {password.match(conformPassword) ? setStatus(200):setStatus(400)} */}
    </div>
  </div>;

    // setup step validators, will be called before proceeding to the next step
    function step2Validator(e: any) {
        // return a boolean
    }

    function step3Validator(e: any) {
        // return a boolean
    }

    function onFormSubmit(e: any) {
        // handle the submit logic here
        // This function will be executed at the last step
        // when the submit button (next button in the previous steps) is pressed
    }
    return (
        <>
            <div className='w-full h-screen p-4 inset-0 bg-gray-500 bg-opacity-75 transition-opacity absolute top-0 flex justify-center'>
                <div className='w-[470px] h-full  bg-white p-2 rounded-md drop-shadow-lg'>
                   
                    <div className='w-full flex items-center justify-between cursor-pointer'>
                        <p className='text-3xl'><IoIosArrowRoundBack /></p>
                        <p className='text-mg text-gray-700 font-medium'>Recover Password</p>
                    </div>
                    <StepProgressBar
                        startingStep={0}
                        onSubmit={onFormSubmit}
                        steps={[
                            {
                                label: 'Email',
                                //   subtitle: '10%',
                                name: 'step 1',
                                content: step1Content
                            },
                            {
                                label: 'Otp',
                                //   subtitle: '50%',
                                name: 'step 2',
                                content: step2Content,
                                //   validator: step2Validator
                            },
                            {
                                label: 'Password',
                                //   subtitle: '100%',
                                name: 'step 3',
                                content: step3Content,
                                //   validator: step3Validator
                            }
                        ]}
                    />

                </div>
                <div onClick={() => setForgetPasswordPopup(false)} className='w-10 h-10 rounded-full bg-[#93c5fd] flex justify-center items-center'><MdClose className='text-2xl' /></div>
            </div>
        </>
    );
}

export default ForgetPassword;


