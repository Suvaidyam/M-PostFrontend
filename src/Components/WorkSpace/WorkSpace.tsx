import type { FC } from 'react';
import Navbar from '../Common/Navbar/Navbar';
import WorkPage from './WorkPage/WorkPage';

interface WorkSpaceProps { }

const WorkSpace: FC<WorkSpaceProps> = () => {
    return (
        <>
            <div className="w-full h-screen">
                <div className='w-full h-fit'><Navbar /></div>
                <div className='w-full h-fit'><WorkPage /></div>
            </div>
        </>
    );
}

export default WorkSpace;
