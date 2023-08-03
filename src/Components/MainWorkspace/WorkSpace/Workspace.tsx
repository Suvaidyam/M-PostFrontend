import { useContext, type FC } from 'react';
import LeftBody from './LeftBody/LeftBody';
import MainBody from './MainBody/MainBody';
import { MyContext } from '../../../Context/Context';

interface WorkspaceProps { }

const Workspace: FC<WorkspaceProps> = () => {
    const { workspaceLefttoggle }: any = useContext(MyContext)
    return (
        <>
            <div className='w-full h-full flex'>
                {workspaceLefttoggle && <div className='min-w-[410px] bg-white border'>
                    <LeftBody />
                </div>}

                <div className='w-full bg-white shadow-inner shadow-gray-300'>
                    <MainBody />
                </div>
            </div>
        </>

    );
}

export default Workspace;
