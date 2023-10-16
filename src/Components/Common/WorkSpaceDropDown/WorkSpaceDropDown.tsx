import type { FC } from 'react';
import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import classNames from 'classnames'
import { GoTriangleDown } from 'react-icons/go';
import CreateWorkSpace from '../CreateWorkSpace/CreateWorkSpace';

interface WorkSpaceDropDownProps { }

const WorkSpaceDropDown: FC<WorkSpaceDropDownProps> = () => {
    const [openModel, setOpenModel] = useState<boolean>(false);
    return (
        <>
            <Menu as="div" className="relative inline-block text-left z-50">
                <div>
                    <Menu.Button className="flex items-center h-full">
                        <span><GoTriangleDown className='text-lg text-black' /></span>
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
                    <Menu.Items className="absolute -left-[85px] mt-2 px-2 w-56 z-[500] origin-top-right rounded-md bg-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            <Menu.Item>
                                {({ active }) => (
                                    <div
                                        onClick={() => setOpenModel(true)}
                                        // href="#"
                                        className={classNames(
                                            active ? 'bg-gray-300 text-gray-900' : 'bg-gray-300 text-gray-700',
                                            'block px-4 py-2 text-sm'
                                        )}
                                    >
                                        Create WorkSpace
                                    </div>
                                )}
                            </Menu.Item>
                            <p className='text-xs text-gray-400 pt-2 font-semibold'>Recently visited</p>
                            <Menu.Item>
                                {({ active }) => (
                                    <div
                                        className={classNames(
                                            active ? 'bg-white text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm'
                                        )}
                                    >
                                        My Workspace
                                    </div>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
            {openModel === true ? <CreateWorkSpace open={openModel} setOpen={setOpenModel} /> : null}
        </>
    );
};

export default WorkSpaceDropDown;
