import { useContext, useEffect, useState, type FC } from 'react';
import { HiOutlinePlus } from 'react-icons/hi';
import { PiDownloadSimpleBold } from 'react-icons/pi';
import { MyContext } from '../../../Context/Context';
import { ThreeDots } from "react-loader-spinner";
import { motion } from "framer-motion";
import { IconButton, Tooltip } from '@mui/material';
import Import from '../LeftBody/MoreAction/Import/Import';

interface MyWorkSpaceProps { }

const MyWorkSpace: FC<MyWorkSpaceProps> = () => {
    const { workSpaceId } = useContext(MyContext);
    const [workSpaceName, setWorkSpaceName] = useState("");
    const [open, setOpen] = useState(false);
    let workSpace_Id = JSON.parse(localStorage.getItem("workSpace") ?? '{}');
    useEffect(() => {
        setWorkSpaceName("");
        setTimeout(() => {
            setWorkSpaceName(workSpace_Id?.name);
        }, 600);
        // eslint-disable-next-line
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
                    {/* <div className='w-8 h-8 bg-yellow-200 flex items-center justify-center rounded-full'><HiOutlinePlus className='cursor-pointer' /></div>
                    <div className='w-8 h-8 bg-yellow-200 flex items-center justify-center rounded-full'><PiDownloadSimpleBold className='cursor-pointer' /></div> */}
                    <div className='group relative w-8 h-8 bg-yellow-200 flex items-center justify-center rounded-full'>
                        <motion.div whileTap={{ scale: 0.75 }} transition={{ duration: 0.2 }}>
                            <Tooltip title={'Add'} arrow>
                                <IconButton>
                                    <HiOutlinePlus className="text-lg text-black" />
                                </IconButton>
                            </Tooltip>
                        </motion.div>
                    </div>
                    <div onClick={() => setOpen(true)} className='group relative w-8 h-8 bg-yellow-200 flex items-center justify-center rounded-full'>
                        <motion.div whileTap={{ scale: 0.75 }} transition={{ duration: 0.2 }}>
                            <Tooltip title={'Import'} arrow>
                                <IconButton>
                                    <PiDownloadSimpleBold className="text-lg text-black" />
                                </IconButton>
                            </Tooltip>
                        </motion.div>
                    </div>
                </div>
            </div>
            {/* ==================== Import Popup ======================= */}
            <Import open={open} setOpen={setOpen} />
        </>
    );
};

export default MyWorkSpace;
