import { useState, FC, useEffect, useContext } from 'react';
import http from '../../../../Service/http';
import Scrollbars from 'react-custom-scrollbars';
import { IconButton, Tooltip } from '@mui/material';
import { MdDelete } from 'react-icons/md';
import { BsThreeDots } from 'react-icons/bs';
import { HiChevronRight } from 'react-icons/hi';
import { BiChevronDown } from 'react-icons/bi';
import { MyContext } from '../../../../Context/Context';
import { toast } from 'react-toastify';

interface HistoryBodyProps { }
interface Details {
    method?: string | undefined;
}

interface Colors {
    [key: string]: string;
    GET: string;
    POST: string;
    PUT: string;
    DELETE: string;
    NA: string;
}

interface IOptions {
    year: 'numeric';
    month: '2-digit';
    day: '2-digit';
}

const HistoryBody: FC<HistoryBodyProps> = () => {
    const [history, setHistory] = useState([]);
    const { loader, setLoader } = useContext(MyContext);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const options: IOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const todayDate: string = today.toLocaleDateString('en-IN', options).split('/').reverse().join('-');
    const yesterdayDate: string = yesterday.toLocaleDateString('en-IN', options).split('/').reverse().join('-');

    const getDetails = (details: Details) => {
        const method: string = details?.method ? details.method.toUpperCase() : "NA";

        const colors: Colors = {
            GET: "green",
            POST: "blue",
            PUT: "yellow",
            DELETE: "red",
            NA: "grey",
        };

        return { method, color: colors[method.toUpperCase()] };
    }
    const toggle = (e: any) => {
        e.toggle = !e.toggle;
        setHistory([...history]);
    };
    // Get History Details
    const getData = () => {
        let workSpace_Id = JSON.parse(localStorage.getItem("workSpace") ?? '');
        http({
            method: "get",
            url: `${process.env.REACT_APP_BASEURL}/history/${workSpace_Id?._id}`,
        })
            .then((res) => {
                setHistory(res.data.history);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    // Delete History Api
    const deleteHistory = (ce: any) => {
        http({
            method: "delete",
            url: `${process.env.REACT_APP_BASEURL}/history/${ce._id}`,
        })
            .then((res) => {
                console.log(res)
                setLoader(!loader)
                toast.success(res.data.message);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <Scrollbars className="w-full h-[83vh] min-h-[71vh] pb-2 scrollbar-hide overflow-y-scroll">
            {history?.map((e: any) => (
                <div key={e._id}>
                    <div className={`w-full h-7 flex items-center justify-between relative px-2 cursor-pointer hover:bg-gray-100 bg-opacity-60 group`}>
                        <div className="flex items-center gap-2 text-gray-700"
                            onClick={() => toggle(e)}
                        >
                            {e.toggle ? <HiChevronRight className="cursor-pointer" /> : <BiChevronDown className="cursor-pointer" />}
                            <p className="text-sm">{e._id === todayDate ? 'Today' : e._id === yesterdayDate ? 'Yesterday' : e._id}</p>
                        </div>
                        <p className="flex items-center">
                            <Tooltip title="Delete" arrow>
                                <IconButton>
                                    <MdDelete className="cursor-pointer hidden group-hover:block text-red-500 text-[16px]" />
                                </IconButton>
                            </Tooltip>
                            <BsThreeDots className="cursor-pointer hidden group-hover:block" />
                        </p>
                    </div>
                    <div className="w-full py-1">
                        {e.data.reverse()?.map((ce: any) => (
                            <div key={ce?._id} className="w-full group relative">
                                {e.toggle ? (
                                    ''
                                ) : (
                                    <div className={`w-full h-7 relative group flex justify-between  bg-opacity-60 py-1 px-2 ${e._id === ce._id ? 'bg-gray-300' : 'hover:bg-gray-100'}`}>
                                        <div className="flex items-center gap-2 w-full group-hover:w-[73%] cursor-pointer"
                                        // onClick={() => handleRequest(ce)}
                                        >
                                            <div className={`text-[11px] text-${getDetails(ce.details)?.color}-600 w-1/4 min-w-[74px] flex justify-end font-semibold`}>
                                                {getDetails(ce.details)?.method}
                                            </div>
                                            <Tooltip title={ce?.details?.url} placement="top" disableInteractive>
                                                <p className="text-[13px] font-normal text-gray-500 truncate">{ce?.details?.url}</p>
                                            </Tooltip>
                                        </div>
                                        <div className="flex items-center group-hover:w-[27%]">
                                            <div className="hidden group-hover:block">
                                                <div className="flex items-center">
                                                    <span className="text-[14px] text-green-600">{ce.created_At}</span>
                                                    <Tooltip title="Delete" arrow>
                                                        <IconButton
                                                            onClick={() => deleteHistory(ce)}
                                                        >
                                                            <MdDelete className="cursor-pointer hidden group-hover:block text-red-500 text-xl" />
                                                        </IconButton>
                                                    </Tooltip>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </Scrollbars>

    );
};

export default HistoryBody;
