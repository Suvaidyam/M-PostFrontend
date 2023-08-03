import { FC, useState } from 'react';
import Vector from '..//..//Assets//Vector.png'
import { FiSearch } from 'react-icons/fi'
import { HiOutlineMoon } from 'react-icons/hi'
import { BiBell } from 'react-icons/bi'
import avatar from '..//..//Assets//avatar.png'
import { NavLink } from 'react-router-dom';
import { FaBars } from 'react-icons/fa'
import { GoTriangleDown } from 'react-icons/go'
import { BsFillShareFill } from 'react-icons/bs'


interface NavbarProps { }

const Navbar: FC<NavbarProps> = () => {
    const [navbarToggle, setNavbarToggle] = useState(false)
    return (

        <>
            <div className='w-full h-full'>
                <div className='w-full h-16  border flex justify-between items-center px-4 relative'>
                    <div className='flex gap-7 max-[550px]:gap-4 max-[400px]:gap-2 max-[400px]:text-sm items-center text-gray-600'>
                        <img className='h-12 max-[400px]:h-8' src={Vector} alt="" />
                        <NavLink to={"/workspace"}><p className='flex items-center gap-1'>
                            <span className='ml-5 max-[550px]:ml-2 '>Workspace</span>
                            <span><GoTriangleDown className='text-lg text-black' /></span></p>
                        </NavLink>
                        <NavLink to="/reports"><span>Reports</span></NavLink>
                        <NavLink to="/explore"><span>Explore</span></NavLink>
                    </div>

                    <div className='flex items-center gap-5 max-[950px]:hidden'>
                        <div className='relative'>
                            <input className='w-48 border-2 py-2 rounded-sm outline-none bg-gray-100 pl-2 pr-5 text-xs text-gray-600' type="text" placeholder='Search..' />
                            <FiSearch className='absolute right-1  top-3' />
                        </div>

                        <div className='w-8 h-8 rounded-[50%] border-[2px] border-slate-300 hover:border-blue-400 flex items-center justify-center'><HiOutlineMoon className='hover:text-blue-500' />
                        </div>

                        <div className='w-8 h-8 rounded-[50%] cursor-pointer border-[2px] border-slate-300 hover:border-blue-400 flex items-center justify-center relative'> <BiBell className='hover:text-blue-500' /><p className='absolute h-2 w-2 bg-red-600 rounded-full top-1 right-2'></p>
                        </div>

                        <div className='w-12 h-12 rounded-[50%] bg-slate-100 border-[2px] p-[2px] border-blue-500 cursor-pointer'>
                            <img src={avatar} alt="" />
                        </div>

                        <button className='bg-blue-600 py-1 px-4 text-white'>SHARE</button>

                    </div>

                    <FaBars className='hidden max-[950px]:block' onClick={() => setNavbarToggle(!navbarToggle)} />
                </div>
                {navbarToggle &&

                    <div className=' shadow-md shadow-gray-200 absolute right-2 max-[550px]:right-0 top-16 rounded w-72 max-[550px]:w-full h-auto  flex flex-col gap-5 p-5 max-[550px]:p-10 font-semibold text-gray-800'>

                        <div className='flex items-center gap-5 cursor-pointer'>
                            <div className='w-8 h-8 rounded-[50%] bg-slate-100 border-[2px] p-[2px] border-blue-500 cursor-pointer'>
                                <img src={avatar} alt="" />
                            </div>
                            <p>Profile</p>
                        </div>

                        <div className='flex items-center gap-5 cursor-pointer'>
                            <div className='w-8 h-8 rounded-[50%] border-[2px] border-slate-300 hover:border-blue-400 hover:text-blue-500 flex items-center justify-center'><HiOutlineMoon className='' />
                            </div>
                            <p>Dark Mode</p>
                        </div>

                        <div className='flex items-center gap-5 cursor-pointer'>
                            <div className='w-8 h-8 rounded-[50%] cursor-pointer border-[2px] border-slate-300 hover:border-blue-400 hover:text-blue-500 flex items-center justify-center relative'> <BiBell className='' /><p className='absolute h-2 w-2 bg-red-600 rounded-full top-1 right-2'></p>
                            </div>
                            <p>Notification</p>
                        </div>



                        <div className='flex items-center gap-5 cursor-pointer'>
                            <div className='w-8 h-8 rounded-[50%] border-[2px] border-slate-300 hover:border-blue-400 hover:text-blue-500  flex items-center justify-center'><BsFillShareFill className='text-sm' />
                            </div>
                            <p>Share</p>
                        </div>

                        <div className='relative w-full'>
                            <input className='w-full border-2 py-2 rounded-sm outline-none bg-gray-100 pl-2 pr-5 text-xs text-gray-600' type="text" placeholder='Search..' />
                            <FiSearch className='absolute right-1  top-3' />
                        </div>

                    </div>}


            </div>
        </>
    );
}

export default Navbar;
