import React, { useContext, useState } from 'react'
import { MyContext } from '../../../../Context/Context';
import { AiOutlineSave } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import VariableValue from './VariableValue';
import NewRequest from './NewRequest';
import { getHeadersAndParams } from '../../../Utils/CommonUtlis';
import Http from "../../../../Service/http";

type Props = {
    onSendClick: any
}


function TopBar({ onSendClick }: Props) {
    const REGEX = /({{.*?}})/g;
    const { jsonText, tabData, setTopBarData, headersData, setStatus, currentActive,
        paramsData, setMsg, setError, changeAction, setchangeAction } = useContext(MyContext);
    const locTabList = JSON.parse(localStorage.getItem('tabsList') as any)
    const activeData = locTabList.filter((e: any) => e._id === currentActive)
    const [data, setData] = useState(tabData?.details || activeData[0].details);
    const [open, setopen] = useState(false);
    const [isLoding, setIsLoding] = useState(false);
    const [isEnv, setIsEnv] = useState([]);
    const handleClose = () => setopen(!open);

    const Save = () => {
        Http({
            url: `http://localhost:4000/collection/${tabData._id}`,
            method: "put",
            data: {
                details: {
                    url: data?.url,
                    method: data.method.toLowerCase(),
                    body: jsonText,
                    headers: getHeadersAndParams(headersData),
                    query: getHeadersAndParams(paramsData),
                },
            },
        })
            .then((res: any) => {
                setMsg("Save Successfully");
                setStatus(res.status);
                setError(true)
                setIsLoding(true);
                setTimeout(() => {
                    setIsLoding(false);
                }, 1000);
                setchangeAction(!changeAction)
            })
            .catch((err: any) => {
                setMsg(err.response.data.message);
                setStatus(err.response.status);
                setError(true)
            });
    };

    return (
        <>
            <div className="w-full flex h-full  items-center  px-3 relative ">
                {/* dropdown */}
                <div className="w-28 h-11 border-gray-300 border  rounded-l-md bg-white flex items-center focus:outline-none">
                    <select
                        className="bg-white font-medium rounded-l-md text-gray-600  px-4 h-8 focus:outline-none border-none "
                        onChange={(e) => { setData({ ...data, method: e.target.value.toLowerCase() }); }}
                        defaultValue={data?.method?.toUpperCase()} >
                        <option value="GET" > GET </option>
                        <option value="POST" > POST </option>
                        <option value="PUT" > PUT </option>
                        <option value="DELETE" > DELETE </option>
                    </select>
                </div>

                {/* input field */}
                <div className="w-full  input-container ">
                    <input
                        placeholder="Enter Request URL"
                        type="url"
                        className="text-xs font-semibold px-2 h-11 w-full border-gray-300 border bg-white focus:outline-none"
                        onChange={(e) => {
                            setData({ ...data, url: e.target.value });
                        }}
                        defaultValue={data?.url || ""}
                    />
                    <div className="input-renderer px-2 ">
                        {data?.url?.split(REGEX).map((word: any, i: any) => {
                            if (word.match(REGEX) !== null) {
                                return (
                                    <Tooltip TransitionComponent={Zoom} title={<VariableValue data={word} />} placement="bottom-start">
                                        <div key={i} className="text-[#1D4ED8] group z-50">
                                            <span className='text-xs font-semibold cursor-pointer'>{word}</span>
                                        </div>
                                    </Tooltip>
                                    // <div key={i} className="text-[#1D4ED8] group z-50">
                                    //   <span className='text-xs font-semibold cursor-pointer'>{word}</span>
                                    //   {/* hover and show variable */}
                                    //   <div className="hidden group-hover:block"><VariableValue data={word} /></div>
                                    // </div>
                                );
                            } else {
                                return <span key={i} className='text-xs font-semibold '>{}</span>;
                            }
                        })}
                    </div>
                </div>
                {/* button */}
                <div>
                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 text-sm px-4 rounded-r-md "
                        onClick={onSendClick}
                    >
                        SEND
                    </button>
                </div>
                <div>
                    <ul className="flex gap-3 pl-3 text-xl">
                        <li>
                            {isLoding === true ? (
                                <p className="flex items-center text-gray-400">
                                    <AiOutlineSave />
                                    ..
                                </p>
                            ) : (
                                <AiOutlineSave
                                    className=" cursor-pointer"
                                    onClick={tabData.parent ? Save : () => setopen(!open)}
                                />
                            )}
                        </li>
                        <li>
                            <BsThreeDots className=" cursor-pointer" />
                        </li>
                    </ul>
                </div>
                {/* new request save */}
                {open === true &&
                    <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description" >
                        <DialogContent><NewRequest setopen={setopen} details={data} />
                        </DialogContent>
                    </Dialog>}
            </div>
        </>
    )
}
export default TopBar

