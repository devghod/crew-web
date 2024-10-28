import React from 'react';
import AccountTable from '../../components/Account/AccountTable';
import { useAccountStore } from '../../stores/accountStore';
import AccountStats from '../../components/Account/AccountStats';

const AccountPage = () => {
  const { getUsers, statistics } = useAccountStore();

  React.useEffect(() => {
    const fnGetUsers = () => getUsers();
    fnGetUsers();
  }, [getUsers]);

  return (
    <div className='grid gap-y-4 grid-cols-1'>
      <div className=''>
        <AccountStats statistics={statistics} />
      </div>
      <div className='border border-0 bg-white p-4 rounded'>
        <AccountTable />
      </div>
    </div>
  );
};

export default AccountPage;
