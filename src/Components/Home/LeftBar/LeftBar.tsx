import { useContext, type FC } from 'react';
import { BiCodeBlock, BiCollapse } from 'react-icons/bi';
import { MdHistory, MdOutlineCollectionsBookmark } from 'react-icons/md';
import { MyContext } from '../../../Context/Context';

interface LeftBarProps { }

const LeftBar: FC<LeftBarProps> = () => {

    const { currentNav, setCurrentNav } = useContext(MyContext);
    return (
        <>
            <div className="w-[100%] min-w-24">
                <div className='min-w-24 flex  flex-col items-center px-1' >
                    <div className={`py-3 my-1 rounded w-full hover:bg-blue-100 duration-500 text-2xl cursor-pointer flex  flex-col  items-center ${currentNav === 'Collection' ? ' bg-[#E8EEFF] transition-opacity text-blue-500' : 'text-gray-600 hover:bg-blue-100  transition-opacity hover:text-blue-400'}`} onClick={() => setCurrentNav('Collection')}>
                        <div><MdOutlineCollectionsBookmark /></div>
                        <div><p className='text-xs'>Collection</p></div>
                    </div>
                    <div className={`py-3 my-1 rounded w-full hover:bg-blue-100 duration-500 text-2xl cursor-pointer flex  flex-col  items-center ${currentNav === 'APIs' ? ' bg-[#E8EEFF] transition-opacity text-blue-500' : 'text-gray-600 hover:bg-blue-100  transition-opacity hover:text-blue-400'}`} onClick={() => setCurrentNav('APIs')}>
                        <div><BiCollapse /></div>
                        <div><p className='text-xs'>APIs</p></div>
                    </div>
                    <div className={`py-3 my-1 rounded w-full hover:bg-blue-100 duration-500 text-2xl cursor-pointer flex  flex-col  items-center ${currentNav === 'Environment' ? ' bg-[#E8EEFF] transition-opacity text-blue-500' : 'text-gray-600 hover:bg-blue-100  transition-opacity hover:text-blue-400'}`} onClick={() => setCurrentNav('Environment')}>
                        <div><BiCodeBlock /></div>
                        <div><p className='text-xs'>Environment</p></div>
                    </div>
                    <div className={`py-3 my-1 rounded w-full hover:bg-blue-100 duration-500 text-2xl cursor-pointer flex  flex-col  items-center ${currentNav === 'History' ? ' bg-[#E8EEFF] transition-opacity text-blue-500' : 'text-gray-600 hover:bg-blue-100  transition-opacity hover:text-blue-400'}`} onClick={() => setCurrentNav('History')}>
                        <div><MdHistory /></div>
                        <div><p className='text-xs'>History</p></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LeftBar;
