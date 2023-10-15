import type { FC } from 'react';
import { AiOutlineSave } from 'react-icons/ai';
import { BsThreeDots } from 'react-icons/bs';
import { FaPlus } from 'react-icons/fa';
import QueryForm from './QueryForm';
import QueryTab from './QueryTab';
import ErrorScreen from './ErrorScreen';

interface TabsProps { }

const Tabs: FC<TabsProps> = () => {
    return (
        <>
            <div className='w-full h-full '>
                <div className='w-full h-16 border-b leading-[4rem]  flex justify-between items-center px-6'>
                    <div className='flex gap-10 items-center  font-medium text-gray-600'>
                        <p>Get Started</p>
                        <div>
                            <FaPlus />
                        </div>
                    </div>
                    <div className='border-l'>
                        <div className=" border-gray-300   rounded-l-md bg-white  focus:outline-none">
                            <select
                                className="bg-white font-medium rounded-l-md text-gray-600  px-4 h-8 focus:outline-none border-none "
                            >
                                <option value="" > No Enviroment </option>
                                <option value="" > No Enviroment </option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="w-full flex  items-center  px-3 relative pt-3 ">
                    {/* dropdown */}
                    <div className="w-28 h-12 leading-[3rem] border-gray-300 border  rounded-l-md bg-white  focus:outline-none">
                        <select
                            className="bg-white font-medium rounded-l-md text-gray-600  px-4 h-8 focus:outline-none border-none "   >
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
                            className="text-sm px-2 h-12 w-full border-gray-300 border bg-white focus:outline-none" />
                    </div>
                    {/* button */}
                    <div>
                        <button
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold h-12 text-sm px-4 rounded-r-md "
                        >
                            SEND
                        </button>
                    </div>
                    <div>
                        <ul className="flex gap-3 pl-3 text-xl">
                            <li>
                                <p className="flex items-center text-gray-400" />
                                <AiOutlineSave />
                            </li>
                            <li>
                                <BsThreeDots className=" cursor-pointer" />
                            </li>
                        </ul>
                    </div>
                    {/* new request save */}

                </div>
                <div className='pt-5 px-3'>
                    <QueryTab />
                    <QueryForm />
                    <ErrorScreen/>
                </div>
            </div>

        </>
    );
}

export default Tabs;
