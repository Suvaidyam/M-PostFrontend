import  { FC,useState } from 'react';
import Vector from '..//..//Assets//Vector.png'
import {FiSearch} from 'react-icons/fi'
import {HiOutlineMoon} from 'react-icons/hi'
import {BiBell} from 'react-icons/bi'
import avatar from '..//..//Assets//avatar.png'
import { NavLink } from 'react-router-dom';
import {FaBars} from 'react-icons/fa'


interface NavbarProps { }

const Navbar: FC<NavbarProps> = () => {
    const [navbarToggle, setNavbarToggle] = useState(false)
    return (

        <>
            <div className='w-full h-16  border flex justify-between items-center px-5'>
                <div className='flex gap-3 items-center'>
                    <img className='h-12' src={Vector} alt="" />
                    <NavLink to={"/workspace"}>Workspace</NavLink>
                    <NavLink to="/reports">Reports</NavLink>
                    <NavLink to="/explore">Explore</NavLink>
                   
                </div> 
                <div className='flex  relative items-center'>
                    <div className={`max-[850px]:flex-col max-[850px]:mt-96 block ${navbarToggle ? 'block' : 'hidden'} flex  gap-7 items-center`}>
                    <input className='border py-1  outline-none bg-gray-300 pl-2' type="text" placeholder='Search..' />
                    <FiSearch className='absolute left-40 top-4'/>
                    
                    <p className='w-8 h-8 rounded-[50%] border-[2px] border-slate-300 hover:border-blue-400 flex items-center justify-center'><HiOutlineMoon className='hover:text-blue-500'/></p>
                    <p className='w-8 h-8 rounded-[50%] cursor-pointer border-[2px] border-slate-300 hover:border-blue-400 flex items-center justify-center relative'> <BiBell className='hover:text-blue-500'/><p className='absolute h-2 w-2 bg-red-600 rounded-full top-1 right-2'></p></p>
                    
                    <p className='w-11 h-11 rounded-[50%] bg-slate-300 border-[3px] border-blue-500 cursor-pointer'><img src={avatar} alt="" /></p>
                    <button className='bg-blue-600 py-1 px-4 text-white'>SHARE</button>
                    </div>
                    <FaBars className='hidden max-[850px]:block' onClick={()=>setNavbarToggle(!navbarToggle)}/>
                </div>
            </div>
        </>
    );
}

export default Navbar;
