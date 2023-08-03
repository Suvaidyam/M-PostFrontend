import type { FC } from 'react';
import Navbar from './Navbar/Navbar';
import { Outlet } from 'react-router-dom';

interface MainWorkspaceProps { }

const MainWorkspace: FC<MainWorkspaceProps> = () => {
    return (
        <>

            <div className='w-screen h-screen'>

                <div className='w-full h-16'>
                    <Navbar />
                </div>

                <div className='w-full h-[90vh]'>
                    <Outlet />
                </div>
            </div>

        </>
    );
}

export default MainWorkspace;
