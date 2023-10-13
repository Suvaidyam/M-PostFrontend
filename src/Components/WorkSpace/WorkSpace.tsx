import {  type FC, useContext } from 'react';
import Navbar from '../Common/Navbar/Navbar';
import WorkPage from './WorkPage/WorkPage';
import { MyContext } from '../../Context/Context';

interface WorkSpaceProps { }

const WorkSpace: FC<WorkSpaceProps> = () => {
    const { darkToggle } = useContext(MyContext)

    return (
        <>
            <div className={`w-full h-screen ${darkToggle === true ? "bg-black text-white" : "bg-white"}`}>
                <div className='w-full h-fit'><Navbar /></div>
                <div className='w-full h-fit'><WorkPage /></div>
            </div>
        </>
    );
}

export default WorkSpace;


