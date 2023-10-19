import { useEffect, type FC, useContext } from 'react';
import { IoAddSharp } from "react-icons/io5";
import { motion } from "framer-motion";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import SearchBar from '../SearchBar/SearchBar';
import axios from 'axios';
import { MyContext } from '../../../Context/Context';
import { toast } from 'react-toastify';
import http from '../../../Service/http';
interface BodyHeadProps { }

const BodyHead: FC<BodyHeadProps> = () => {
    const workSpace = JSON.parse(localStorage.getItem("workSpace") ?? '[]');
    const { setCollection, loader, setLoader } = useContext(MyContext);
    const config = {
        headers: {
            'token': sessionStorage.getItem("token")
        },
        params: {
            workspace_id: workSpace?._id,
        }
    };

    const url = `${process.env.REACT_APP_BASEURL}/collection`;
    const getData = () => {
        let workSpace_Id = JSON.parse(localStorage.getItem("workSpace") ?? '');
        if (workSpace_Id) {
            http({
                method: "get",
                url: `${process.env.REACT_APP_BASEURL}/collection/${workSpace_Id?._id}`,
            })
                .then((res) => {
                    setCollection(res.data.collection);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            console.log("workspace Id NOT Found, Please select a workspace");
        }


    };


    const data = {
        type: "folder",
        name: "New Collection",
        workspace_id: workSpace?._id,
    }
    const postData = () => {
        axios.post(url, data, config)
            .then((res: any) => {
                setLoader(!loader);
                toast.success(res.data.message);
            })
            .catch((err) => {
                console.log(err)
            });
    };

    useEffect(() => {
        getData();
    }, [loader]);
    return (
        <>
            <div className='relative  flex items-center '>
                <SearchBar />
                <div className='group relative'>
                    <motion.div whileTap={{ scale: 0.75 }}>
                        <Tooltip title={'Create collection'} arrow>
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
