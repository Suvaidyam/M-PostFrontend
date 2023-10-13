import { useContext, type FC, useEffect } from 'react';
import { AiFillFolder } from 'react-icons/ai';
import { MyContext } from '../../../../Context/Context';

interface CollectionBodyProps { }

const CollectionBody: FC<CollectionBodyProps> = () => {
    const { slide } = useContext(MyContext);
   

    return (
        <>
            <div className={`w-full h-full ${slide === true ? 'hidden' : 'block'}`}>
                <details>
                    <summary className='border py-2 cursor-pointer flex h-12 pl-2'>
                        <div>
                            <div className='flex items-center gap-3'><AiFillFolder className='text-xl' /> New Collection</div>
                            <div><p className='text-xs text-blue-600 pl-8 -mt-1'>36 item</p></div>
                        </div>
                    </summary>
                    <div className=''>
                        <p className='border p-2'>Epcot is a theme park at Walt Disney World Resort featuring exciting attractions, international pavilions, award-winning fireworks and seasonal special events.</p>
                    </div>
                </details>
                <details>
                    <summary className='border py-2 cursor-pointer flex h-12 pl-2'>
                        <div>
                            <div className='flex items-center gap-3'><AiFillFolder className='text-xl' /> New Collection</div>
                            <div><p className='text-xs text-blue-600 pl-8 -mt-1'>36 item</p></div>
                        </div>
                    </summary>
                    <div className=''>
                        <p className='border p-2'>Epcot is a theme park at Walt Disney World Resort featuring exciting attractions, international pavilions, award-winning fireworks and seasonal special events.</p>
                    </div>
                </details>
            </div>
        </>
    );
}

export default CollectionBody;
