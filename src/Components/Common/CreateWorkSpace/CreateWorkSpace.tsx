import type { FC } from 'react';

interface CreateWorkSpaceProps { }

const CreateWorkSpace: FC<CreateWorkSpaceProps> = () => {
    return (
        <>
            <div className="w-full min-w-[500px]">
                <p className="text-gray-700 text-xl font-medium">Create workspace</p>
                <div className="w-full mt-2">
                    <div>
                        <label htmlFor="name" className="text-sm font-medium text-gray-500">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="outline-blue-500 border-[1.5px] px-2 w-full rounded-sm py-1"
                        // onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mt-4 space-y-4">
                        <p className="text-sm text-gray-600 font-semibold">Visibility</p>
                        <div className="flex items-start">
                            <div className="flex h-5 items-center">
                                <input
                                    value="PERSONAL"
                                    id="personal"
                                    name="candidates"
                                    type="radio"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                // onChange={(e) => setVisibility(e.target.value)}
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="personal" className="cursor-pointer text-gray-700">
                                    Personal
                                </label>
                                <p className="text-gray-500 text-xs">Only you can access</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="flex h-5 items-center">
                                <input
                                    value="TEAM"
                                    id="comments"
                                    name="candidates"
                                    type="radio"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                // onChange={(e) => setVisibility(e.target.value)}
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="comments" className=" cursor-pointer text-gray-700">
                                    Team
                                </label>
                                <p className="text-gray-500 text-xs">All team members can access</p>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <div className="flex h-5 items-center">
                                <input
                                    value="PUBLIC"
                                    id="offers"
                                    name="candidates"
                                    type="radio"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                // onChange={(e) => setVisibility(e.target.value)}
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="offers" className=" cursor-pointer text-gray-700">
                                    Public
                                </label>
                                <p className="text-gray-500 text-xs">Everyone can view</p>
                            </div>
                        </div>
                    </div>
                    <button
                        className="px-4 py-2 bg-blue-500 rounded-md text-xs font-medium text-white mt-3
           "
                    // onClick={postData}
                    >
                        Create Workspace
                    </button>
                </div>
            </div>
        </>
    );
}

export default CreateWorkSpace;
