import type { FC } from 'react';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import classNames from 'classnames';
import { BiDotsHorizontalRounded } from 'react-icons/bi';

interface RequestActionProps { }

const RequestAction: FC<RequestActionProps> = () => {
    return (
        <>
            <Menu as="div" className="relative inline-block text-left pr-2">
                <div>
                    <Menu.Button className="flex items-center h-full">
                        <span><BiDotsHorizontalRounded className='text-lg text-black mt-2' /></span>
                    </Menu.Button>
                </div>

                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 mt-2 w-56 z-50 origin-top-right rounded-md bg-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            <Menu.Item>
                                {({ active }) => (
                                    <div
                                        className={classNames(
                                            active ? 'bg-white text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm cursor-pointer'
                                        )}
                                    >
                                        Share
                                    </div>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <div
                                        // onClick={() => setOpenModel(true)}
                                        className={classNames(
                                            active ? 'bg-white text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm cursor-pointer'
                                        )}
                                    >
                                        Rename
                                        {/* <div><EditCollection /></div> */}
                                    </div>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <div
                                        // onClick={deleteData}
                                        className={classNames(
                                            active ? 'bg-red-500 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm cursor-pointer'
                                        )}
                                    >
                                        Delete
                                    </div>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </>
    );
}

export default RequestAction;
