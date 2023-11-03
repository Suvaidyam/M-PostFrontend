import { useContext, useEffect, useState, type FC } from 'react';
import { HiOutlinePlus } from 'react-icons/hi';
import { PiDownloadSimpleBold } from 'react-icons/pi';
import { MyContext } from '../../../Context/Context';
import { ThreeDots } from "react-loader-spinner";

interface MyWorkSpaceProps { }

const MyWorkSpace: FC<MyWorkSpaceProps> = () => {
    const { workSpaceId } = useContext(MyContext);
    const [workSpaceName, setWorkSpaceName] = useState("");
    // let workSpace_Id = JSON.parse(localStorage.getItem("workSpace") ?? '');
    useEffect(() => {
        setWorkSpaceName("");
        setTimeout(() => {
            setWorkSpaceName(workSpaceId?.name);
        }, 600);
    }, [workSpaceId]);
    return (
        <>
            <div className='w-full h-[55px] max-h-[55px] flex justify-between items-center px-2'>
                
                <div>
                    {workSpaceName ? (
                        <>{workSpaceName}</>
                    ) : (
                        <div className="pl-6">
                            {" "}
                            <ThreeDots
                                height="60"
                                width="60"
                                radius="9"
                                color="#2563EB"
                                ariaLabel="three-dots-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                            />{" "}
                        </div>
                    )}
                </div>
                <div className='flex justify-between items-center gap-3'>
                    <div className='w-8 h-8 bg-yellow-200 flex items-center justify-center rounded-full'><HiOutlinePlus className='cursor-pointer' /></div>
                    <div className='w-8 h-8 bg-yellow-200 flex items-center justify-center rounded-full'><PiDownloadSimpleBold className='cursor-pointer' /></div>
                </div>
            </div>
        </>
    );
};

export default MyWorkSpace;
