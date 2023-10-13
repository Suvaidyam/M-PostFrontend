import type { FC } from 'react';
import { FiSearch } from 'react-icons/fi';
import { HiOutlinePlus } from 'react-icons/hi';

interface SearchBarProps { }

const SearchBar: FC<SearchBarProps> = () => {
    return (
        <>
            {/* Search Bar */}
            <div className='relative flex items-center '>
                <input className='w-[87%] border-2 my-2 ml-2 mr-1 py-2 pl-2 pr- rounded-sm outline-none bg-gray-100 text-xs text-gray-600' type="text" placeholder='Search..' />
                <FiSearch className='absolute right-14' />
                <div className='w-8 h-8 mr-1 hover:bg-gray-100  duration-500 flex justify-center items-center rounded-full'><HiOutlinePlus className='text-lg cursor-pointer' /></div>
            </div>
        </>
    );
}

export default SearchBar;
