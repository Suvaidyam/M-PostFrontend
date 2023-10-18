import type { FC } from 'react';
import { Fragment, useState, useContext } from 'react';
import { Menu, Transition } from '@headlessui/react';
import classNames from 'classnames';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import axios from 'axios';
import { MyContext } from '../../../../Context/Context';
import EditCollection from './EditCollection';

interface MoreActionProps {

}

const MoreAction: FC<MoreActionProps> = () => {
    const { loader, setLoader, activeOption } = useContext(MyContext);
    const [openModel, setOpenModel] = useState<boolean>(false);

    const config = {
        headers: {
            'token': sessionStorage.getItem("token")
        }
    };

    const url = `${process.env.REACT_APP_BASEURL}/collection/${activeOption?._id}`;
    const handleDelete = () => {
        axios.delete(url, config)
            .then(response => {
                setLoader(!loader);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <>
            <Menu as="div" className="relative inline-block text-left">
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
                                            'block px-4 py-2 text-sm'
                                        )}
                                    >
                                        Share
                                    </div>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <div
                                        onClick={() => setOpenModel(true)}
                                        className={classNames(
                                            active ? 'bg-white text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm'
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
                                        className={classNames(
                                            active ? 'bg-white text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm'
                                        )}
                                    >
                                        Add folder
                                    </div>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <div
                                        className={classNames(
                                            active ? 'bg-white text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm'
                                        )}
                                    >
                                        Add request
                                    </div>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <div
                                        onClick={handleDelete}
                                        className={classNames(
                                            active ? 'bg-red-500 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm'
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
            {openModel === true ? <EditCollection open={openModel} setOpen={setOpenModel} /> : null}
        </>
    );
}

export default MoreAction;
