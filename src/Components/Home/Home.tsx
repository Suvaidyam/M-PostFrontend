import { useContext, type FC } from 'react';
import Navbar from '../Common/Navbar/Navbar';
import MyWorkSpace from './MyWorkSpace/MyWorkSpace';
import LeftBar from './LeftBar/LeftBar';
import LeftBody from './LeftBody/LeftBody';
import RightBar from './RightBar/RightBar';
import Tabs from './Tabs/Tabs';
import { MyContext } from '../../Context/Context';

interface HomeProps { }

const Home: FC<HomeProps> = () => {
    const { darkToggle, slide } = useContext(MyContext);
    return (
        <>
            <div className={`w-full h-screen ${darkToggle === true ? 'bg-slate-950 text-white opacity-80' : ''} fixed`}>
                <Navbar />
                <div className='w-full h-full pt-20 flex'>
                    {/* ======= Left Body ========= */}
                    <div className='w-[25%] h-full  border-r '>
                        <div className='w-full h-16  border-b'>
                            <MyWorkSpace />
                        </div>
                        <div className='w-full h-full flex'>
                            <div className='w-[30%] z-0 border-r'>
                                <LeftBar />
                            </div>
                            <div className='w-full z-0 overflow-y-scroll pb-[66px]'>
                                <LeftBody />
                            </div>
                        </div>
                    </div>
                    <div className='w-full h-full flex'>
                        <div className='w-[94%] h-full border-r'><Tabs /></div>
                        <div className='w-[6%] h-full'><RightBar /></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;