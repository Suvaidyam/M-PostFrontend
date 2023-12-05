import { type FC } from 'react';
import { IoAddSharp } from "react-icons/io5";
import { motion } from "framer-motion";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import SearchBar from '../SearchBar/SearchBar';
interface BodyHeadProps {
    postData: any;
    title: string
}

const BodyHead: FC<BodyHeadProps> = ({ postData, title }) => {
    const storedData: any = sessionStorage.getItem('paylode');
    const UserData = JSON.parse(storedData);
    const workSpace = JSON.parse(localStorage.getItem("workSpace") ?? '{}');
    const permission = workSpace?.share?.some((e: any) =>
        e?.permission === 'readWrite' && e?.shareId === UserData?._id
    )
    const rootPermission = workSpace?.created_by === UserData?._id;
    // let data;
    // if (rootPermission === true) {
    //     data = false;
    // } else {
    //     if (permission === true) {
    //         data = false;
    //     } else {
    //         data = true;
    //     }
    // }
    // console.log(data)
    return (
        <>
            <div className='relative  flex items-center '>
                <SearchBar />
                <button
                    // disabled={permission && rootPermission}
                    className={`group relative`}>
                    <motion.div whileTap={{ scale: 0.75 }} whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
                        <Tooltip title={title} arrow>
                            <IconButton className='' onClick={postData}>
                                {/* <IconButton disabled={!(permission || rootPermission)} className='' onClick={postData}> */}
                                <IoAddSharp className="text-xl  rounded-sm" />
                            </IconButton>
                        </Tooltip>
                    </motion.div>
                </button>
            </div>
        </>
    );
}

export default BodyHead;
