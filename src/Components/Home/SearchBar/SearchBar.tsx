import type { FC } from 'react';
import { FiSearch } from 'react-icons/fi';

interface SearchBarProps { }

const SearchBar: FC<SearchBarProps> = () => {
    return (
        <>
            {/* Search Bar */}
            <input className='w-[87%] border-2 my-2 ml-2 mr-1 py-2 pl-2 pr- rounded-sm outline-none bg-gray-100 text-xs text-gray-600' type="text" placeholder='Search..' />
            <FiSearch className='absolute right-14' />
        </>
    );
}

export default SearchBar;
