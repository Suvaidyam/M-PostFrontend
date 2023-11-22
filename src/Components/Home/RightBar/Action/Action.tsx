import { Fragment, type FC } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { BiDotsHorizontalRounded } from 'react-icons/bi';

interface ActionProps {
    Restore: any,
    Delete: any
}

const Action: FC<ActionProps> = ({ Restore, Delete }) => {
    return (
        <>
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="flex items-center mt-1 h-full">
                        <span><BiDotsHorizontalRounded className='text-lg text-black' /></span>
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
                    <Menu.Items className="absolute right-0 w-36 z-50 origin-top-right rounded-md bg-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            <Menu.Item>
                                <div
                                    onClick={Restore}
                                    className={`w-full block px-4 py-2 text-sm hover:bg-white hover:text-gray-900`}>
                                    Restore
                                </div>
                            </Menu.Item>
                            <Menu.Item>
                                <div
                                    onClick={Delete}
                                    className={`w-full block px-4 py-2 text-sm hover:bg-red-500 hover:text-white`}>
                                    Delete
                                </div>
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </>
    );
}

export default Action;
