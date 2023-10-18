import React, { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { RxDotFilled } from "react-icons/rx";
import { BiCollection } from "react-icons/bi";
import { AiOutlinePlus, AiOutlineAntDesign } from "react-icons/ai";
import { motion } from "framer-motion";
import Http from "../../../../Service/http";
import { useContext } from "react";
import { MyContext } from "../../../../Context/Context";
// import { DataContext } from "../../../Context/DataProvider";

type Props = {}

export default function TabList({ }: Props) {
    const {
        changeAction,
        workSpaceId,
        tabsList,
        setTabsList,
        setTabData,
        currentActive,
        setCurrentActive,
        setCurrentActiveEnv,
        currentActiveEnv,
    } = useContext(MyContext);
    const [newEnviroment, setNewEnviroment] = useState([]);
    const local_variable = newEnviroment?.filter((e: any) => e.name !== "Globals");
    let storeData = sessionStorage.getItem("recentTablength");
    const [recentTablength, setrecentTablength] = useState(storeData ? parseInt(storeData) : 0);
    sessionStorage.setItem("recentTablength", recentTablength as any)

    const newReqObj = {
        name: "Untitled Request",
        type: "request",
        parent: null,
        details: {
            url: "",
            method: "GET",
            headers: {},
            body: {},
            query: {},
        },
    };

    // const tabsList = [newReqObj, newReqObj];

    const handleNewTab = () => {
        let el = { ...newReqObj, _id: recentTablength };
        el.name = el.name;
        setTabsList([...tabsList, el]);
        setCurrentActive(el._id);
        setTabData(el);
        setrecentTablength(recentTablength + 1);

    };
    const handleTabClose = (e: { _id: any; }) => {
        let index = tabsList.findIndex((f: { _id: any; }) => f._id === e._id);
        tabsList.splice(index, 1);
        setTabsList(tabsList);
        setTimeout(() => {
            if (tabsList.length) {
                setCurrentActive(tabsList[index ? index - 1 : 0]._id);
                // close tabs set data active tabs
                tabsList.map((e: { _id: any; }) => (
                    e._id === tabsList[index ? index - 1 : 0]._id &&
                    setTabData(e)
                ))
            } else {
                setCurrentActive(null);
            }
        }, 5);
    };


    const getDetails = (details: { method: string; }) => {
        let method: any = details?.method ? details?.method.toUpperCase() : "NA";
        let colors: any = {
            GET: "green",
            POST: "blue",
            PUT: "yellow",
            DELETE: "red",
            NA: "grey",
        };
        return { method, color: colors[method.toUpperCase()] };
    };

    const getData = () => {
        let workSpace_Id = JSON.parse(localStorage.getItem("workSpace") as string);
        Http({
          method: "get",
          url: `http://localhost:4000/environment/${workSpace_Id?._id}`,
        })
          .then((res) => {
            setNewEnviroment(res.data.environment);
          })
          .catch((err) => {
            console.log(err);
          });
    };

    useEffect(() => {
        return () => {
            getData();
        };
    }, [changeAction, workSpaceId, tabsList]);
    return (
        <>
            <div className="w-full h-[7vh] mt-0.5 bg-white flex">
                <div className="w-[80%]  flex h-full border-b overflow-x-scroll scrollbar-hide">
                    {tabsList?.map((e: { _id: any; details?: any; type?: any; name?: any; }) => (
                        <div
                            key={e._id}
                            className={`flex items-center justify-between${e._id === currentActive
                                ? "border-b-2 border-b-blue-500 border-r duration-300" : "border-r"}  w-44 min-w-44 px-1 h-full group cursor-pointer`}
                            onClick={() => setCurrentActive(e._id)}  >
                            <div className="flex items-center  w-[142px] min-w-44 h-full gap-2" onClick={() => setTabData(e)}>
                                <p
                                    className={`text-[11px] font-semibold text-${getDetails(e?.details).color}-600`}
                                >
                                    {getDetails(e?.details).method === "NA" ? (
                                        e.type === "folder" ? (
                                            <BiCollection />
                                        ) : (
                                            <AiOutlineAntDesign className="text-xl text-gray-500" />
                                        )
                                    ) : (
                                        <>{getDetails(e?.details).method}</>
                                    )}
                                </p>
                                <p className="flex items-center text-xs text-gray-600 h-full truncate">{e?.name || e.details?.url}</p>
                            </div>
                            <RxDotFilled className="text-2xl text-blue-500 group-hover:hidden block" />
                            <IoIosClose
                                className="text-2xl cursor-pointer hidden group-hover:block"
                                onClick={() => handleTabClose(e)}
                            />
                        </div>
                    ))}
                    {/* new Request add btn */}
                    <motion.div
                        whileTap={{ scale: 0.75 }}
                        className="h-full flex items-center ml-1"
                    >
                        <AiOutlinePlus
                            className="cursor-pointer hover:bg-slate-200 w-8 h-8 p-2 rounded-md text-gray-600"
                            onClick={handleNewTab}
                        />
                    </motion.div>
                </div>
                {/* ===========environment selected ===========*/}
                <div className="w-[20%] border-l border-b flex justify-center items-center gap-2 relative">
                    <select className="w-full h-full outline-none text-sm pl-2"
                        onChange={(e) => setCurrentActiveEnv(e.target.value)}
                    >
                        <option value="null" className={`w-full text-sm`}>
                            No Enviroment
                        </option>
                        {local_variable?.map((e: any) => (
                            <option
                                selected={e._id === currentActiveEnv}
                                key={e._id}
                                className={`w-full text-sm `}
                                value={e._id}
                            >
                                {e.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </>
    )
}