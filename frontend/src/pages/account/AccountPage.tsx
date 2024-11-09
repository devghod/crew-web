import React, { useMemo, useState } from 'react';
import AccountTable from '../../components/Account/AccountTable';
import { useAccountStore } from '../../stores/accountStore';
import AccountStats from '../../components/Account/AccountStats';
import AccountController from '../../components/Account/AccountController';
import { isWhiteSpace } from '../../utils/generalHelper';

const AccountPage = () => {
  const { getUsers, statistics, users, isLoading } = useAccountStore();
  const [search, setSearch] = useState('');

  React.useEffect(() => {
    const fnGetUsers = () => getUsers();
    fnGetUsers();
  }, [getUsers]);

  const filterUsers = useMemo(() => {
    if (search.length > 0 && !isWhiteSpace(search)) {
      return users.filter(user => {
        const data = search.toLocaleLowerCase();

        if (
          [
            user._id.toLowerCase(),
            user.email.toLowerCase(),
            user.username.toLowerCase(),
            user.date_created.toLowerCase(),
          ].includes(data)
        )
          return user;
      });
    } else {
      return users;
    }
  }, [users, search]);

  function handleSearch(data: string) {
    setSearch(data);
  }

  return (
    <div className='grid gap-y-4 grid-cols-1'>
      <div className=''>
        <AccountStats statistics={statistics} />
      </div>
      <div className='border border-0 bg-white p-4 rounded-lg dark:bg-gray-800'>
        <AccountController handleSearch={handleSearch} />
        <AccountTable users={filterUsers} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default AccountPage;
