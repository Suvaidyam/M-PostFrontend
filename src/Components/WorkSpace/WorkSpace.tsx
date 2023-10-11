import type { FC } from 'react';
import Navbar from '../Common/Navbar/Navbar';
import WorkPage from './WorkPage/WorkPage';

interface WorkSpaceProps {}

const WorkSpace: FC<WorkSpaceProps> = () => {
    return (
        <>
            <div className='w-full'><Navbar/></div>
            <div className='w-full'><WorkPage/></div>
        </>
    );
}

export default WorkSpace;
