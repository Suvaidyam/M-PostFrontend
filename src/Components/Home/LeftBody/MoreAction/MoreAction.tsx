import type { FC } from 'react';

interface MoreActionProps { }

const MoreAction: FC<MoreActionProps> = () => {
    return (
        <>
            <div className="w-48 border bg-gray-100 drop-shadow-md rounded-md">
                <div className="flex flex-col justify-center w-full py-1">
                    <div className="w-full px-4 py-1.5 hover:bg-white cursor-pointer text-sm font-normal ">Share</div>
                    <label className="w-full px-4 py-1.5 hover:bg-white cursor-pointer text-sm font-normal" htmlFor='name'>Rename</label>
                    <div className="w-full px-4 py-1.5 hover:bg-white cursor-pointer text-sm font-normal">Add folder</div>
                    <div className="w-full px-4 py-1.5 hover:bg-white cursor-pointer text-sm font-normal">Add request</div>
                    <div className="w-full px-4 py-1.5 hover:bg-red-500 cursor-pointer text-sm font-normal hover:text-white">Delete</div>
                </div>
            </div>
        </>
    );
}

export default MoreAction;
