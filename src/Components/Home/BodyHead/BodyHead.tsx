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

    return (
        <>
            <div className='relative  flex items-center '>
                <SearchBar />
                <div className='group relative'>
                    <motion.div whileTap={{ scale: 0.75 }} whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
                        <Tooltip title={title} arrow>
                            <IconButton onClick={postData}>
                                <IoAddSharp className="text-xl cursor-pointer rounded-sm" />
                            </IconButton>
                        </Tooltip>
                    </motion.div>
                </div>
            </div>
        </>
    );
}

export default BodyHead;
