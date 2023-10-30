import React, { useContext, useEffect, useState } from 'react'
import ErrorScreen from './ErrorScreen';
import ApiError from './ApiError';
import { MyContext } from '../../../../Context/Context';
import { AiOutlineGlobal } from "react-icons/ai";
import { LineWave } from "react-loader-spinner";
// import "./Tabs.css";
import ReactJson from 'react-json-view'
import Scrollbars from 'react-custom-scrollbars';
import http from '../../../../Service/http';
import { toast } from 'react-toastify';

type Props = {
    apiResponse: any
    isLoading: boolean


}

export default function Response({ apiResponse, isLoading }: Props) {
    const { tabData } = useContext(MyContext);
    // console.log(activeOption)
    const [body, setBody] = useState<boolean>(true);
    const [header, setHeader] = useState<boolean>(false);
    const [responseData, setResponseData] = useState<string[] | null>(null);
    const currentActive = JSON.parse(localStorage.getItem('currentActive') ?? '{}')

    // console.log(currentActive)
    const errorData = {
        error: apiResponse?.data
    }

    const BodyTab = () => {
        setBody(true);
        setHeader(false);
    };
    const HeaderTab = () => {
        setBody(false);
        setHeader(true);
    };

    const SaveResponse = () => {
        http({
            url: `http://localhost:4000/collection/res/${tabData._id}`,
            method: "put",
            data: apiResponse.data
        })
            .then((res: any) => {
                toast.success('Save Successfully')
                setResponseData(apiResponse.data)
                // console.log(responseData)
            })
    }
    const getResponse = () => {
        http({
            method: "get",
            url: `http://localhost:4000/collection/getById/${currentActive}`,
        })
            .then((res) => {
                setResponseData(res.data.collection.details.response);
                // console.log(res.data.collection)
            })
            .catch((err) => {
                console.log(err);
            });
    }
    useEffect(() => {
        if (typeof (currentActive) === 'string') {
            getResponse()
        }
        else {
            setResponseData(null)
        }
    }, [currentActive])



    // console.log("apiResponse", apiResponse);
    let headers = apiResponse?.headers;
    const getStatusElem = (res: any) => {
        if (res) {
            // console.log(typeof res.status, res.status);
            if (res.status < 300) {
                return <span className="text-green-600">{res.status}</span>;
            } else if (res.status >= 300 && res.status < 500) {
                return <span className="text-yellow-600">{res.status}</span>;
            } else {
                return <span className="text-red-600">{res.status}</span>;
            }
        } else {
            return <span className="text-red-600">NA</span>;
        }
    };
    const getResponseHeaderElem: any = (headers: any) => {
        let arr = [];
        if (headers) {
            for (let k in headers) {
                arr.push(
                    <span key={k} className="text-gray-800 text-sm font-medium">
                        <b>{k}:</b>
                        {headers[k]}
                    </span>
                );
            }
            return arr;
        } else {
            return <p>No Headers</p>;
        }
    };
    return (
        <>
            {apiResponse?.data === undefined ? (
                apiResponse?.status === "100" ?
                    <div>
                        {isLoading ? (<div className="flex items-center justify-center  pt-12">
                            <LineWave
                                height="100"
                                width="100"
                                color="#4fa94d"
                                ariaLabel="line-wave"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                                firstLineColor="#2563EB"
                                middleLineColor="#2563EB"
                                lastLineColor="#2563EB"
                            />
                        </div>)
                            :
                            responseData && typeof responseData === 'object' ?
                                <div className='break-all'>
                                    <div className="flex justify-between w-full h-[10%]">
                                        <div className="px-2 flex items-center  py-1 gap-5">
                                            <span
                                                className={`text-sm font-medium cursor-pointer  ${body === true ? "text-blue-600" : "text-gray-800 "}`}
                                            >
                                                Body
                                            </span>
                                
                                        </div>
                                        <div className="px-2 flex items-center gap-5">
                                            <span className="text-gray-800 text-sm font-medium">
                                                <AiOutlineGlobal />
                                            </span>
                                            <pre>
                                                <span className="text-gray-800 text-sm font-medium">
                                                    <b>Status:</b>
                                                    {getStatusElem(apiResponse)}
                                                </span>
                                               
                                              </pre>
                                        </div>
                                    </div>
                                    <ReactJson
                                        name={false}
                                        displayDataTypes={false}
                                        displayObjectSize={false}
                                        enableClipboard={false}
                                        src={responseData}
                                    />
                                </div>
                                :
                                <ErrorScreen />
                        }

                    </div>
                    : <div>
                        {isLoading ? (<div className="flex items-center justify-center  pt-12">
                            <LineWave
                                height="100"
                                width="100"
                                color="#4fa94d"
                                ariaLabel="line-wave"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                                firstLineColor="#2563EB"
                                middleLineColor="#2563EB"
                                lastLineColor="#2563EB"
                            />
                        </div>)
                            :
                            <ApiError />}

                    </div>

            ) : (

                <>
                    <div className="w-full h-full bg-white border overflow-hidden">
                        {isLoading ? (
                            <div className="flex items-center justify-center  pt-12">
                                <LineWave
                                    height="100"
                                    width="100"
                                    color="#4fa94d"
                                    ariaLabel="line-wave"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                    visible={true}
                                    firstLineColor="#2563EB"
                                    middleLineColor="#2563EB"
                                    lastLineColor="#2563EB"
                                />
                            </div>
                        ) : (
                            <>
                                <div className="w-full h-full ">
                                    <div className="flex justify-between w-full h-[10%]">
                                        {/* Show this part in tabs - Body and Headers */}
                                        <div className="px-2 flex items-center  py-1 gap-5">
                                            <span
                                                className={`text-sm font-medium cursor-pointer  ${body === true ? "text-blue-600" : "text-gray-800 "}`}
                                                onClick={BodyTab}
                                            >
                                                Body
                                            </span>
                                            <span
                                                className={`text-sm font-medium cursor-pointer  ${header === true ? "text-blue-600" : "text-gray-800 "}`}
                                                onClick={HeaderTab}
                                            >
                                                Headers
                                            </span>
                                        </div>
                                        <div className="px-2 flex items-center gap-5">
                                            <span className="text-gray-800 text-sm font-medium">
                                                <AiOutlineGlobal />
                                            </span>
                                            <pre>
                                                <span className="text-gray-800 text-sm font-medium">
                                                    <b>Status:</b>
                                                    {getStatusElem(apiResponse)}
                                                </span>
                                                <span className="text-gray-800 text-sm font-medium">
                                                    <b> Time:</b>
                                                    <span className="text-orange-600 ">
                                                        {apiResponse.resTime}ms
                                                    </span>
                                                </span>
                                                <span className="text-gray-800 text-sm font-medium">
                                                    <b> Size:</b>
                                                    <span className="text-blue-600 ">
                                                        {apiResponse.resSize}B
                                                    </span>
                                                </span>
                                            </pre>
                                            <button
                                                className="text-gray-800 text-sm font-medium hover:text-blue-600"
                                                onClick={SaveResponse}
                                            >
                                                SaveResponse
                                            </button>
                                        </div>
                                    </div>
                                    {header === true ? (
                                        <div className="w-full mt-1 h-[89%]">
                                            <div className="w-full flex">
                                                <div className="w-1/2 border py-1.5 px-2 text-sm font-medium text-gray-400">
                                                    Key
                                                </div>
                                                <div className="w-1/2 border py-1.5 px-2 text-sm font-medium text-gray-400">
                                                    Value
                                                </div>
                                            </div>
                                            {getResponseHeaderElem(headers).map((e: any) => (
                                                <div className="w-full flex">
                                                    <div className="w-1/2 border py-1.5 px-2 text-sm ">
                                                        {e.key}
                                                    </div>
                                                    <div className="w-1/2 border py-1.5 px-2 text-sm ">
                                                        {e.props.children[1]}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : null}
                                    <div className="px-2 h-[90%]">
                                        {body === true ? (
                                            <Scrollbars className="h-full">
                                                <div className="h-full break-all  font-mono">
                                                    {typeof apiResponse?.data === 'object' ? <ReactJson
                                                        name={false}
                                                        displayDataTypes={false}
                                                        displayObjectSize={false}
                                                        enableClipboard={false}
                                                        src={apiResponse?.data}
                                                    />
                                                        : <ReactJson
                                                            name={false}
                                                            displayDataTypes={false}
                                                            displayObjectSize={false}
                                                            enableClipboard={false}
                                                            src={errorData} />}
                                                </div>
                                            </Scrollbars>
                                        ) : null}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </>
            )}

        </>
    )
}