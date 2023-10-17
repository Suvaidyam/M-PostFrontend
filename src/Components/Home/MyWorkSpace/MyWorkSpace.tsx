import { useContext, type FC } from 'react';
import { HiOutlinePlus } from 'react-icons/hi';
import { PiDownloadSimpleBold } from 'react-icons/pi';
import { MyContext } from '../../../Context/Context';

interface MyWorkSpaceProps { }

const MyWorkSpace: FC<MyWorkSpaceProps> = () => {
    const { workSpaceId } = useContext(MyContext);
    return (
        <>
            <div className='w-full h-16 flex justify-between items-center px-2  border-b'>
                <div>
                    {/* {workSpaceId.map((e: any) => (
                        <p key={e.id} className='truncate text-lg'>{e.name}</p>
                    ))} */}
                    {workSpaceId.name}
                </div>
                <div className='flex justify-between items-center gap-3'>
                    <div className='w-8 h-8 bg-yellow-200 flex items-center justify-center rounded-full'><HiOutlinePlus className='cursor-pointer' /></div>
                    <div className='w-8 h-8 bg-yellow-200 flex items-center justify-center rounded-full'><PiDownloadSimpleBold className='cursor-pointer' /></div>
                </div>
            </div>
        </>
    );
};

export default MyWorkSpace;
