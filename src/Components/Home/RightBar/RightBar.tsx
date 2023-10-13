import type { FC } from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import { BiHelpCircle } from 'react-icons/bi';
import { BsCaretRight, BsCode } from 'react-icons/bs';
import { FiTrash2 } from 'react-icons/fi';

interface RightBarProps { }

const RightBar: FC<RightBarProps> = () => {
    return (
        <>
            <div className=" flex border-l-[1.5px] flex-col items-center justify-center gap-5 h-full bg-white py-1.5 relative">
                <div className="flex flex-col justify-between h-full ">
                    <div>
                        <div className="cursor-pointer flex justify-center items-center mt-2 gap-1">
                            <AiOutlineEye className="text-gray-600 w-8 h-8 p-2 rounded-md hover:bg-blue-200 hover:text-blue-600" />
                        </div>
                        <div className="cursor-pointer flex justify-center items-center mt-1 gap-1">
                            <BsCode className="text-gray-600 w-8 h-8 p-2 rounded-md hover:bg-blue-200 hover:text-blue-600" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-0.5">
                        <div className="hover:bg-blue-200 w-8 h-8 flex justify-center items-center rounded-md cursor-pointer group">
                            <BsCaretRight className=" group-hover:text-blue-600 text-gray-600" />
                        </div>
                        <p className="text-[10px] w-full flex justify-center font-medium text-gray-600">Runner</p>
                        <div
                            className="hover:bg-blue-200 w-8 h-8 flex justify-center items-center rounded-md cursor-pointer group">
                            <FiTrash2 className=" group-hover:text-blue-600 text-gray-600" />
                        </div>
                        <p className="text-[10px] w-full flex justify-center font-medium text-gray-600">Trash</p>
                        <div
                            className="hover:bg-blue-200 w-8 h-8 flex justify-center items-center 
                             rounded-md cursor-pointer group"
                        >
                            <BiHelpCircle className=" group-hover:text-blue-600 text-gray-600" />
                        </div>
                        <p className="text-[10px] w-full flex justify-center font-medium text-gray-600">Help</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RightBar;
