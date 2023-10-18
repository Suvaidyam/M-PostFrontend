import { useContext, type FC, useState } from 'react';
import { FcFolder } from 'react-icons/fc';
import { BiCaretRight, BiCaretDown } from "react-icons/bi";
import { MyContext } from '../../../../Context/Context';
import MoreAction from '../MoreAction/MoreAction';

interface CollectionBodyProps { }

const CollectionBody: FC<CollectionBodyProps> = () => {
    const { collection ,setActiveOption} = useContext(MyContext);
    const [toggleFolder, setToggleFolder] = useState<boolean>(false);
    const [activeFolder, setActiveFolder] = useState<string>('');

    const ClickFolder = (id: string) => {
        setToggleFolder(!toggleFolder);
        setActiveFolder(id);
    };
    const ClickOption = (item: string) => {
        setActiveOption(item);
    };

    return (
        <>
            {collection?.map((item: any) => (
                <div key={item._id} className='flex relative group justify-between border-b h-9 items-center cursor-pointer'>
                    <div className='flex'>
                        <div onClick={() => ClickFolder(item._id)} className='w-10 h-full flex items-center justify-center text-lg'>
                            {(toggleFolder === true && item._id === activeFolder) ? <BiCaretDown /> : < BiCaretRight />}
                        </div>
                        <div className='text-xl pr-2'>
                            <FcFolder />
                        </div>
                        <div className='text-sm'>
                            {item.name}
                        </div>
                    </div>
                    <div onClick={() => ClickOption(item)} className="hidden group-hover:block absolute right-2">
                        <MoreAction />
                    </div>
                </div >
            ))}
        </>
    );
}

export default CollectionBody;
