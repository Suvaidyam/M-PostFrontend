import { useContext, type FC } from 'react';
import Navbar from '../Common/Navbar/Navbar';
import MyWorkSpace from './MyWorkSpace/MyWorkSpace';
import LeftBar from './LeftBar/LeftBar';
import LeftBody from './LeftBody/LeftBody';
import RightBar from './RightBar/RightBar';
import Tabs from './Tabs/Tabs';
import { MyContext } from '../../Context/Context';
import Trash from './RightBar/Trash/Trash';
import SetCode from './RightBar/SetCode/SetCode';

interface HomeProps { }

const Home: FC<HomeProps> = () => {
    const { darkToggle, trash, codeMethod } = useContext(MyContext);
    return (
        <>
            <div className={`w-full h-screen ${darkToggle === true ? 'bg-slate-950 text-white opacity-80' : ''} fixed z-0`}>
                <Navbar />
                <div className='w-full h-full pt-20 flex'>
                    {/* ======= Left Body ========= */}
                    <div className='w-[25%] h-full  border-r '>
                        <div className='w-full h-[55px]  max-h-[55px]  min-h-[55px] border-b'>
                            {/* =========== Left Body Top ============== */}
                            <MyWorkSpace />
                        </div>
                        <div className='w-full h-full  z-0 flex'>
                            <div className='w-[30%] border-r'>
                                <LeftBar />
                            </div>
                            <div className='w-full  overflow-y-scroll pb-[60px]'>
                                <LeftBody />
                            </div>
                        </div>
                    </div>
                    <div className='w-full h-full flex'>
                        {/* ========== Center Body ========== */}
                        <div className='w-[94%] flex h-full border-r'>
                            <Tabs />
                            {trash === true && <Trash />}
                            {codeMethod === true && <SetCode />}
                        </div>
                        {/* ========== Right Body =========== */}
                        <div className='w-[6%] h-full'><RightBar /></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;