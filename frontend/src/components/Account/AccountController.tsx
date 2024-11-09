import React, { useState } from 'react';
import { AddAccountIcon, SearchIcon } from '../../utils/icons';

export type TAccountController = {
  handleSearch: (data: string) => void;
};

const AccountController = (props: TAccountController) => {
  const { handleSearch } = props;
  const [search, setSearch] = useState('');

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setSearch(value);
  }

  function fnSearch() {
    handleSearch(search);
  }

  return (
    <div className='mb-4'>
      <div className='flex justify-between'>
        <div className='flex'>
          <input
            value={search}
            onChange={handleChange}
            className='px-2 py-1 text-sm w-full border rounded-lg text-slate-700'
          />
          <button
            onClick={fnSearch}
            className='px-2 py-1 rounded-lg text-slate-200 bg-sky-500 hover:bg-sky-600 mx-2'
          >
            <SearchIcon />
          </button>
        </div>
        <div className='flex'>
          <button className='px-2 py-1 rounded-lg text-slate-200 bg-teal-500 hover:bg-teal-600'>
            <AddAccountIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountController;
