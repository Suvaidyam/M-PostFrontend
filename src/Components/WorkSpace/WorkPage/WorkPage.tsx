import { useState, type FC } from 'react';

interface WorkPageProps { }

const WorkPage: FC<WorkPageProps> = () => {
    const [change, setChange] = useState(false);
    const toggle = () => {
        console.log(change);
        setChange(!change)
    }
    return (
        <>
            <p className='cursor-pointer text-xl' onClick={toggle}>Click me</p>
            <div className='w-full h-[600px] flex'>
                <div className={`h-full duration-1000 bg-red-400 ${change === true ? 'w-[5%]' : 'w-[20%]'}`}></div>
                <div className={`h-full duration-1000 bg-blue-500 ${change === true ? 'w-[95%]' : 'w-[80%]'}`}></div>
            </div>
        </>
    );
}

export default WorkPage;
