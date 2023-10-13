import { type FC, useContext } from 'react';
import { AiFillFolder } from 'react-icons/ai';
import { FiSearch } from 'react-icons/fi';
import { HiOutlinePlus } from 'react-icons/hi';
import { PiDownloadSimpleBold } from 'react-icons/pi';
import { MyContext } from '../../../Context/Context';
import WorkspaceBody from '../WorkspaceBody/WorkspaceBody';
import LeftBar from '../../Home/LeftBar/LeftBar';

interface WorkPageProps { }

const WorkPage: FC<WorkPageProps> = () => {
    const { slide } = useContext(MyContext);
    return (
        <>
            <div className='w-full h-screen flex'>
                <div className={`h-full duration-1000 border-r ${slide === true ? 'w-[5%]' : 'w-[25%]'}`}>
                    {/* Top */}
                    <div className='w-full h-16 flex justify-between items-center px-2  border-b'>
                        <p className='truncate text-lg'>My Workspace</p>
                        <div className='flex justify-between items-center gap-3'>
                            <div className='w-8 h-8 bg-yellow-200 flex items-center justify-center rounded-full'><HiOutlinePlus className='cursor-pointer' /></div>
                            <div className='w-8 h-8 bg-yellow-200 flex items-center justify-center rounded-full'><PiDownloadSimpleBold className='cursor-pointer' /></div>
                        </div>
                    </div>
                    <div className='w-full h-full flex'>
                        <div>
                            {/* ======= Left Nav ======== */}
                            <LeftBar/>
                        </div>
                        {/* <div className='w-full '> */}
                        <div className={`w-full h-full ${slide === true ? 'hidden' : 'block'}`}>
                            {/* Search Bar */}
                            <div className='relative flex items-center gap-1'>
                                <input className='w-[87%] border-2 m-2 py-2 pl-2 pr-5 rounded-sm outline-none bg-gray-100 text-xs text-gray-600' type="text" placeholder='Search..' />
                                <FiSearch className='absolute right-14' />
                                <HiOutlinePlus className='text-xl cursor-pointer' />
                            </div>
                            {/* Folder Dropdown */}
                            <details>
                                <summary className='border py-2 cursor-pointer flex h-12 pl-2'>
                                    <div>
                                        <div className='flex items-center gap-3'><AiFillFolder className='text-xl' /> New Collection</div>
                                        <div><p className='text-xs text-blue-600 pl-8 -mt-1'>36 item</p></div>
                                    </div>
                                </summary>
                                <div className=''>
                                    <p className='border p-2'>Epcot is a theme park at Walt Disney World Resort featuring exciting attractions, international pavilions, award-winning fireworks and seasonal special events.</p>
                                </div>
                            </details>
                            <details>
                                <summary className='border py-2 cursor-pointer flex h-12 pl-2'>
                                    <div>
                                        <div className='flex items-center gap-3'><AiFillFolder className='text-xl' /> New Collection</div>
                                        <div><p className='text-xs text-blue-600 pl-8 -mt-1'>36 item</p></div>
                                    </div>
                                </summary>
                                <div className=''>
                                    <p className='border p-2'>Epcot is a theme park at Walt Disney World Resort featuring exciting attractions, international pavilions, award-winning fireworks and seasonal special events.</p>
                                </div>
                            </details>
                        </div>
                    </div>
                </div>
                <div className={`h-full duration-1000   ${slide === true ? 'w-[95%]' : 'w-[75%]'}`}><WorkspaceBody /></div>
            </div>
        </>
    );
};

export default WorkPage;
