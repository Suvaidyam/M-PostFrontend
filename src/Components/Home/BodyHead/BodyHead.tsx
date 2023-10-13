import { useEffect, type FC, useContext } from 'react';
import { IoAddSharp } from "react-icons/io5";
import { motion } from "framer-motion";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import SearchBar from '../SearchBar/SearchBar';
import axios from 'axios';
import { MyContext } from '../../../Context/Context';
interface BodyHeadProps { }

const BodyHead: FC<BodyHeadProps> = () => {
    const { collection, setCollection } = useContext(MyContext);
    const config = {
        headers: {
            'token': sessionStorage.getItem("token")
        }
    };
    const GetData = () => {
        const url = `${process.env.REACT_APP_BASEURL}/collection`;
        axios.get(url, config)
            .then(response => {
                setCollection(response.data.collection);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    useEffect(() => {
        GetData();
    }, []);
    return (
        <>
            <div className='relative flex items-center '>
                <SearchBar />
                <div className='group relative'>
                    <motion.div whileTap={{ scale: 0.75 }}>
                        <Tooltip title={'Create collection'} arrow>
                            <IconButton onClick={GetData}>
                                <IoAddSharp className="text-xl cursor-pointer rounded-sm" />
                            </IconButton>
                        </Tooltip>
                    </motion.div>
                </div>
            </div>
        </>
    );
}
// onClick={postData}

export default BodyHead;
