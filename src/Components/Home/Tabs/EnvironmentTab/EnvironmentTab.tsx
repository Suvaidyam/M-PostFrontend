import { MyContext } from '../../../../Context/Context';
import { useContext, useState } from "react";
import Scrollbars from 'react-custom-scrollbars';
import { AiOutlineSave } from "react-icons/ai";
import AddRow from "../TabsBody/AddRow";
import http from "../../../../Service/http";
import { BsArrowRight } from 'react-icons/bs';
import { GoCopy } from 'react-icons/go';
type Props = {}
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

function EnvironmentTab({ }: Props) {
    const { SetEnviroment, enviroment, collection, setStatus, setMsg, setError, tabData, currentActive } = useContext(MyContext);
    const [rows, addRows] = useState([0]);
    const [effect, setEffect] = useState(false);
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
    const postData = () => {
        http({
            method: "put",
            url: `http://localhost:4000/environment/${currentActive}`,
            data: {
                details: enviroment
            }
        })
            .then((res) => {
                setMsg('Save Successfully')
                setStatus(res.status)
                setError(true)
                setEffect(true)
                setTimeout(() => {
                    setEffect(false)
                }, 1000)
            })
            .catch((err) => {
                setMsg(err.response.data.message)
                setStatus(err.response.status)
                setError(true)
            });
    }
    console.log(collection)
    return (
        <>
            <Scrollbars className="w-full h-[83vh] min-h-[79vh] scrollbar-hide overflow-y-scroll bg-white ">
                {tabData.type === 'folder' ?

                    (
                        <div className="flex justify-center">
                            <div className='w-1/2 h-full'>
                                <p className='py-3 font-semibold'>Documentation</p>
                                <p className="text-2xl font-semibold">{tabData?.name}</p>
                                {collection?.map((view: any) => (
                                    <div key={view._id}>
                                        {tabData._id === view.parent ? (
                                            <div>
                                                <div className="w-full h-14 mb-3 rounded hover:bg-gray-100 flex justify-between items-center mt-5 pl-4">
                                                    <div className='flex gap-5 '>
                                                        <p className={`text-xl font-semibold text-${getDetails(view?.details).color}-600 `} >
                                                            {getDetails(view?.details).method}
                                                        </p>
                                                        <p className='text-xl font-semibold'>{view.name}</p>
                                                    </div>
                                                    <div className="flex gap-1 items-center pr-2 hover:text-blue-700 hover:underline cursor-pointer">Open Request <BsArrowRight /></div>
                                                </div>
                                                <div className='w-full h-10 px-2 flex items-center group justify-between rounded text-gray-800 bg-gray-100'>
                                                    {view.details.url}
                                                    <GoCopy className='cursor-pointer hidden group-hover:block' />
                                                </div>
                                                <div>
                                                    <div className='text-2xl mt-2 font-semibold'>Body</div>
                                                    <div className="w-full mt-2 py-1  px-2 border">
                                                        <div className='flex justify-between py-1'>
                                                            <p className='py-2 px-5 font-semibold bg-gray-100 text-xs'>JSON</p>
                                                            <p><GoCopy className='text-xl cursor-pointer' /></p>
                                                        </div>
                                                        <div className='w-full h-auto'>
                                                            {view?.details?.body === null ?
                                                                <pre>
                                                                    &#123;
                                                                    &#125;
                                                                </pre>
                                                                :
                                                                <pre>
                                                                    {JSON.stringify(view?.details?.body, null, 2)}
                                                                </pre>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : null}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )

                    : (
                        <div>
                            <div className=" h-14 px-5 flex items-center justify-between">
                                <div>
                                    <p className="font-semibold">{tabData?.name}</p>
                                </div>
                                <div className=" flex items-center justify-center">
                                    <div className="">
                                        <button className="flex justify-start items-center text-lg rounded px-4 py-2 hover:bg-gray-200" onClick={postData}>
                                            <AiOutlineSave />
                                            <span className="ml-0.5 text-sm font-semibold">{effect === true ? <>...</> : <>save</>}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="px-5 h-16 py-2">
                                <p className=" text-sm font-sans text-gray-500">
                                    Global variables for a workspace are a set of variables that are
                                    always available within the scope of that workspace. They can be
                                    viewed and edited by anyone in that workspace.
                                </p>
                            </div>
                            <hr />

                            <div className="  bg-white overflow-y-scroll scrollbar-hide  h-[159px] pb-2  mb-2">
                                <div className="overflow-x-auto relative  pt-3">
                                    <table className="w-full text-sm text-left text-gray-600 ">
                                        <thead className="text-xs border text-gray-600 uppercase bg-white ">
                                            <tr>
                                                <th scope="col" className="p-2 w-6 border">
                                                    <div className="flex items-center"></div>
                                                </th>
                                                <th scope="col" className="  py-1.5 px-6 border">
                                                    VARIABLE
                                                </th>
                                                <th scope="col" className="py-1.5 px-6 border">
                                                    INITIAL VALUE
                                                </th>
                                                <th scope="col" className=" py-1.5 px-6 border">
                                                    CURRENT VALUE
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {rows.map((row, index) => (
                                                <AddRow
                                                    params={undefined} addRows={addRows}
                                                    rowId={index}
                                                    key={index}
                                                    data={enviroment}
                                                    setData={SetEnviroment}
                                                    {...{
                                                        variable: 'Add a new variable', value: '',
                                                        description: '', type: 'url', variableN: 'variable',
                                                        valueN: 'value', descriptionN: 'current_value',
                                                    }} />
                                            ))}

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

            </Scrollbars>
        </>
    )
}

export default EnvironmentTab