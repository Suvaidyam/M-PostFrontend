import { useContext, type FC } from 'react';
import { BiCodeBlock, BiCollapse } from 'react-icons/bi';
import { MdHistory, MdOutlineCollectionsBookmark } from 'react-icons/md';
import { RxHamburgerMenu } from 'react-icons/rx';
import { MyContext } from '../../../Context/Context';

interface LeftBarProps { }

const LeftBar: FC<LeftBarProps> = () => {
    const { slide, setSlide } = useContext(MyContext);
    const toggle = () => {
        console.log(slide);
        setSlide(!slide)
    }
    return (
        <>
            <div className="w-24 min-w-24 h-  border-r">
                <div className='w-24 flex  flex-col mt-5 items-center' >
                    {/* <div className='pb-5 text-2xl cursor-pointer'>
                        <RxHamburgerMenu onClick={toggle} />
                    </div> */}
                    <div className='pb-5 text-2xl cursor-pointer flex  flex-col  items-center'>
                        <div><MdOutlineCollectionsBookmark /></div>
                        <div><p className='text-xs'>Collection</p></div>
                    </div>
                    <div className='pb-5 text-2xl cursor-pointer flex  flex-col  items-center'>
                        <div><BiCollapse /></div>
                        <div><p className='text-xs'>APIs</p></div>
                    </div>
                    <div className='pb-5 text-2xl cursor-pointer flex  flex-col  items-center'>
                        <div><BiCodeBlock /></div>
                        <div><p className='text-xs'>Environment</p></div>
                    </div>
                    <div className='pb-5 text-2xl cursor-pointer  flex flex-col  items-center'>
                        <div><MdHistory /></div>
                        <div><p className='text-xs'>History</p></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LeftBar;
