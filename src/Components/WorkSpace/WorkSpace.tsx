import type { FC } from 'react';
import Navbar from '../Common/Navbar/Navbar';

interface WorkSpaceProps {}

const WorkSpace: FC<WorkSpaceProps> = () => {
    return (
        <>
            <div className='w-full'><Navbar/></div>
        </>
    );
}

export default WorkSpace;
