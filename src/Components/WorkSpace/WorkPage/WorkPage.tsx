import { useState, type FC } from 'react';
import { BiCodeBlock } from 'react-icons/bi';
import { HiOutlinePlus } from 'react-icons/hi';
import { MdHistory, MdOutlineCollectionsBookmark } from 'react-icons/md';
import { PiDownloadSimpleBold } from 'react-icons/pi';
import { RxHamburgerMenu } from 'react-icons/rx'

interface WorkPageProps { }

const WorkPage: FC<WorkPageProps> = () => {
    const [change, setChange] = useState(false);
    const toggle = () => {
        console.log(change);
        setChange(!change)
    }
    return (
        <>
            <div className='w-full h-screen flex'>
                <div className={`h-full duration-1000 bg-pink-400 border-r ${change === true ? 'w-[5%]' : 'w-[25%]'}`}>
                    {/* Top */}
                    <div className='w-full h-16 bg-green-500 flex justify-between items-center px-2  border-b'>
                        <p className='truncate'>My Workspace</p>
                        <div className='flex justify-between items-center gap-3'>
                            <div className='w-8 h-8 bg-yellow-200 flex items-center justify-center rounded-full'><HiOutlinePlus className='cursor-pointer' /></div>
                            <div className='w-8 h-8 bg-yellow-200 flex items-center justify-center rounded-full'><PiDownloadSimpleBold className='cursor-pointer' /></div>
                        </div>
                    </div>
                    <div className='w-full h-full flex'>
                        <div className="w-24 min-w-24 h- bg-red-400 border-r flex justify-center">
                            <div className='w-full'>
                                <div className='pb-5 text-2xl  cursor-pointer' onClick={toggle}>
                                    <RxHamburgerMenu />
                                </div>
                                <div className='pb-5 text-2xl cursor-pointer'>
                                    <div><MdOutlineCollectionsBookmark /></div>
                                    <div><p className='text-xs '>Collection</p></div>
                                </div>
                                <div className='pb-5 text-2xl cursor-pointer'>
                                    <div><BiCodeBlock /></div>
                                    <div><p className='text-xs'>Environment</p></div>
                                </div>
                                <div className='pb-5 text-2xl cursor-pointer'>
                                    <div><MdHistory /></div>
                                    <div><p className='text-xs'>History</p></div>
                                </div>
                            </div>
                        </div>
                        <div>
                            {/* Hello */}
                        </div>
                    </div>
                </div>
                <div className={`h-full duration-1000 bg-blue-500 ${change === true ? 'w-[95%]' : 'w-[75%]'}`}></div>
            </div>
        </>
    );
};

export default WorkPage;
