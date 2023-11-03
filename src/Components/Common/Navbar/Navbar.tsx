import { FC, useContext, useState } from 'react';
import Vector from '..//..//Assets//Vector.png'
import { FiSearch } from 'react-icons/fi'
import { HiOutlineMoon } from 'react-icons/hi'
import { BiBell, BiLogOutCircle } from 'react-icons/bi'
import avatar from '..//..//Assets//avatar.png'
import { NavLink, useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa'
import { CgProfile } from 'react-icons/cg'
import { BsFillShareFill } from 'react-icons/bs'
import { MyContext } from '../../../Context/Context';
import WorkSpaceDropDown from '../WorkSpaceDropDown/WorkSpaceDropDown';
import axios from 'axios';
import { url } from 'inspector';
import Avatar from '../../Assets/avatar-f.jpg'
import Avatar_f from '../../Assets/avatar-f.jpg'
import Profile from '../Profile/Profile';

interface NavbarProps { }

const Navbar: FC<NavbarProps> = () => {
    const [navbarToggle, setNavbarToggle] = useState(false);
    const { darkToggle, setDakToggle, setMsg, setError, url, setUrl } = useContext(MyContext);
    const [openProfile, setOpenProfile] = useState<boolean>(false)
    const navigate = useNavigate();
    const DarkMOdeToggle = () => {
        setDakToggle(!darkToggle)
    };
    // Logout 
    const logout = async () => {
        let token = sessionStorage.getItem('token')
        if (token) {
            axios.post(`${process.env.REACT_APP_BASEURL}/auth/logout`, {},
                {
                    headers: {
                        "token": ` ${token}`
                    }
                })
                .then((res: any) => {
                    setMsg(res?.data?.message);
                    setError(true);
                    sessionStorage.removeItem('token');
                    sessionStorage.removeItem('paylode');
                    setTimeout(() => {
                        setError(false)
                        navigate("/");
                    }, 1000)
                })
                .catch((err) => console.log(err))
        } else {
            console.log("token require")
        }
    };
    return (

        <>
            <div className={`w-full h-20 z-50 fixed top-0 bg-white ${darkToggle === true ? 'bg-slate-900 text-white' : ''}`}>
                <div className='w-full  h-20  border flex justify-between items-center px-4 relative'>
                    <div className='flex gap-7 max-[550px]:gap-4 max-[400px]:gap-2 max-[400px]:text-sm items-center text-gray-600'>
                        <img className='h-11 max-[400px]:h-8' src={Vector} alt="" />
                        <NavLink className='flex items-center gap-1' to={"/workspace"}>
                            <span className='ml-5 max-[550px]:ml-2 '>Workspace</span>
                            <WorkSpaceDropDown />
                        </NavLink>
                        <NavLink to="/reports"><span>Reports</span></NavLink>
                        <NavLink to="/explore"><span>Explore</span></NavLink>
                    </div>

                    <div className='flex items-center gap-5 max-[950px]:hidden'>
                        <div className='relative'>
                            <input className='w-48 border-2 py-2 rounded-sm outline-none bg-gray-100 pl-2 pr-5 text-xs text-gray-600' type="text" placeholder='Search..' />
                            <FiSearch className='absolute right-1  top-3' />
                        </div>
                        <div className='w-8 h-8 rounded-full border-[2px] border-slate-300 hover:border-blue-400 flex items-center justify-center'><HiOutlineMoon onClick={DarkMOdeToggle} className='hover:text-blue-500' />
                        </div>
                        <div className='w-8 h-8 rounded-full cursor-pointer border-[2px] border-slate-300 hover:border-blue-400 flex items-center justify-center relative'> <BiBell className='hover:text-blue-500' /><p className='absolute h-2 w-2 bg-red-600 rounded-full top-1 right-2'></p>
                        </div>
                        <div className='w-12 group h-12 rounded-full bg-slate-100 border-[2px] p-[2px] border-blue-500 cursor-pointer'>
                            <img
                                className='rounded-full'
                                src={url?.url ? `${process.env.REACT_APP_BASEURL}/` + url?.url : url?.gender === 'male' ? Avatar : Avatar_f}
                                // src={avatar}
                                alt="" />

                            {/*  My Profile */}
                            <div className='absolute group-hover:block hidden w-[200px] py-2 bg-white border rounded-md top-[63px] right-[120px]'>
                                <div onClick={() => setOpenProfile(!openProfile)} className="flex h-7 cursor-pointer hover:text-white items-center px-2  duration-300 hover:bg-blue-400 justify-between">
                                    <p>Profile</p>
                                    <CgProfile />
                                </div>
                                <div onClick={logout} className="flex h-7 cursor-pointer hover:text-white duration-300 items-center px-2 hover:bg-red-600 justify-between">
                                    <p>Logout</p>
                                    <BiLogOutCircle />
                                </div>
                            </div>
                        </div>
                        <button className='bg-blue-600 py-1 px-4 text-white'>SHARE</button>
                    </div>
                    <FaBars className='hidden max-[950px]:block cursor-pointer' onClick={() => setNavbarToggle(!navbarToggle)} />
                </div>
                {navbarToggle &&
                    <div className='bg-white shadow-md z-[600] shadow-gray-200 absolute right-2 max-[550px]:right-0 top-16 rounded w-72 max-[550px]:w-full h-auto flex flex-col gap-5 p-5 max-[550px]:p-10 font-semibold text-gray-800'>

                        <div className='flex items-center gap-5 cursor-pointer'>
                            <div className='w-8 h-8 rounded-[50%] bg-slate-100 border-[2px] p-[2px] border-blue-500 cursor-pointer'>
                                <img src={avatar} alt="" />
                            </div>
                            <p>Profile</p>
                        </div>

                        <div className='flex items-center gap-5 cursor-pointer'>
                            <div className='w-8 h-8 rounded-[50%] border-[2px] border-slate-300 hover:border-blue-400 hover:text-blue-500 flex items-center justify-center'><HiOutlineMoon onClick={DarkMOdeToggle} className='' />
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
            <Profile setOpen={setOpenProfile} open={openProfile} />
        </>
    );
}

export default Navbar;
