import type { FC } from 'react';
import Navbar from '../Common/Navbar/Navbar';
import MyWorkSpace from './MyWorkSpace/MyWorkSpace';
import LeftBar from './LeftBar/LeftBar';
import LeftBody from './LeftBody/LeftBody';
import RightBar from './RightBar/RightBar';
import Tabs from './Tabs/Tabs';

interface HomeProps { }

const Home: FC<HomeProps> = () => {
    return (
        <>
            <div className="w-full h-screen ">
                <Navbar />
                <div className='w-full h-full fixed pt-20 flex'>
                    {/* ======= Left Body ========= */}
                    <div className='w-[25%] h-full border-r block'>
                        <div className='w-full h-16 border-b'>
                            <MyWorkSpace />
                        </div>
                        <div className='w-full h-full flex'>
                            <div className='w-[30%] border-r'>
                                <LeftBar />
                            </div>
                            <div className='w-full'>
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