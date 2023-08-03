import { useContext, type FC } from 'react';
import { MyContext } from '../../../../Context/Context';
import {FaBars} from 'react-icons/fa'

interface LeftBodyProps { }

const LeftBody: FC<LeftBodyProps> = () => {
    const{setWorkspaceLefttoggle,workspaceLefttoggle}:any=useContext(MyContext)
    return (
        <>
            <div className='w-full'>
                <div className='w-full h-12 border flex items-center px-1'>
                    <span><FaBars className='cursor-pointer' onClick={()=>setWorkspaceLefttoggle(!workspaceLefttoggle)}/></span>
                </div>
                <div className='w-full h-[82vh] flex'>
                    <div className='w-[20%] border'>

                    </div>
                    <div className='w-[80%] '>
                        <div className='w-full h-12 border'>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LeftBody;
