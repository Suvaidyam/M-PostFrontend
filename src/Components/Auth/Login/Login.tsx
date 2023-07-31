import type { FC } from 'react';
import Logo from '..//..//Assets//login-Bg.png'
import Vetor from '..//..//Assets//Vector.png'

interface LoginProps { }

const Login: FC<LoginProps> = () => {
    return (
        <>
            <div className='w-full h-screen'>
                <div className='w-full h-full md:flex'>
                    {/* left */}
                    <div className='md:w-[60%] h-full block px-16 py-12 '>
                        <div className=' w-full flex justify-between'>
                            <img src={Vetor} alt="" className='w-10' />
                            <div className='text-sm'>
                                New user ? Sign Up
                            </div>
                        </div>
                        <div className="w-full flex flex-col gap-2 mt-6">
                            <h1 className="text-3xl font-medium">Welcome Back</h1>
                            <p className="text-xs font-medium">
                                Pleace enter following information to continue
                            </p>
                        </div>
                        <div className='mt-10 flex gap-5 flex-col'>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="email" className="font-medium">
                                    Email or Usename
                                </label>
                                <input
                                    type="text"
                                    id="email"
                                    className="border-2 outline-none w-full py-1 px-2"
                                    placeholder="Enter Email or Username"
                                // onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="email" className="font-medium">
                                    Email or Usename
                                </label>
                                <input
                                    type="text"
                                    id="email"
                                    className="border-2 outline-none w-full py-1 px-2"
                                    placeholder="Enter Email or Username"
                                // onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="flex justify-between">
                                <div className="flex items-center gap-1">
                                    <input
                                        type="checkbox"
                                        id="check"
                                        className="border-2 outline-none"
                                        placeholder="Enter Password"
                                    // onClick={() => setCheck(!check)}
                                    />
                                    <label htmlFor="check" className="text-sm cursor-pointer">
                                        I agree with{" "}
                                        <span className="text-red-500">terms & conditions</span>
                                    </label>
                                </div>
                                {/* <Link className="text-sm text-blue-600" onClick={() => setOpenForgetPopUp(!openForgetPopUp)}>
                                    Forget Password?
                                </Link> */}
                            </div>
                            <div className="w-full flex justify-end">
                                <button
                                    // disabled={check}
                                    // className={`${check === false ? "bg-blue-600" : "bg-blue-200"}
                                    //   py-2 text-white text-sm px-10 rounded-sm`}
                                    // onClick={save}
                                    className='bg-blue-400'
                                >
                                    LOGIN
                                </button>
                            </div>

                        </div>
                    </div>
                    {/* left end */}

                    {/* right */}
                    <div className='w-[40%] h-full  bg-blue-600 hidden md:block'>
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
