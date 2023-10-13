import type { FC } from 'react';
import { HiOutlinePlus } from 'react-icons/hi';
import { PiDownloadSimpleBold } from 'react-icons/pi';

interface MyWorkSpaceProps { }

const MyWorkSpace: FC<MyWorkSpaceProps> = () => {
    return (
        <>
            <div className='w-full h-16 flex justify-between items-center px-2  border-b'>
                <p className='truncate text-lg'>My Workspace</p>
                <div className='flex justify-between items-center gap-3'>
                    <div className='w-8 h-8 bg-yellow-200 flex items-center justify-center rounded-full'><HiOutlinePlus className='cursor-pointer' /></div>
                    <div className='w-8 h-8 bg-yellow-200 flex items-center justify-center rounded-full'><PiDownloadSimpleBold className='cursor-pointer' /></div>
                </div>
            </div>
        </>
    );
};

export default MyWorkSpace;
