import { useContext, type FC } from 'react';
import { MyContext } from '../../../../Context/Context';
import { FaBars } from 'react-icons/fa'

interface MainBodyProps { }

const MainBody: FC<MainBodyProps> = () => {
    const { setWorkspaceLefttoggle, workspaceLefttoggle }: any = useContext(MyContext)
    return (
        <>
            <div className='w-full flex h-full'>
                <div className='w-full'>
                    <div className='w-full h-12 border flex items-center px-1'>
                        {workspaceLefttoggle ? '' : <span><FaBars className='cursor-pointer' onClick={() => setWorkspaceLefttoggle(!workspaceLefttoggle)} /></span>}

                    </div>
                    <div></div>
                </div>
                <div className='w-16 h-full border'></div>
            </div>
        </>
    );
}

export default MainBody;
