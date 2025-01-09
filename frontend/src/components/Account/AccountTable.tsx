import { useMemo } from 'react';
import AccountTableRow from './AccountTableRow';
import { TUser } from '../../types/AccountType';

type TAccountTable = {
  users: TUser[];
  isLoading: boolean;
};

const AccountTable = (props: TAccountTable) => {
  const { users, isLoading } = props;

  const filterUsers = useMemo(() => users, [users]);

  return (
    <>
      {isLoading && (
        <table className='w-full table-auto rounded border dark:border-gray-600 animate-pulse'>
          <thead className='border dark:border-gray-600'>
            <tr className='grid grid-cols-4 gap-x-2 border-b-2 dark:border-gray-600'>
              <td className='mx-2 my-3 h-3 bg-slate-300 dark:bg-slate-600 rounded-lg'></td>
              <td className='mx-2 my-3 h-3 bg-slate-300 dark:bg-slate-600 rounded-lg'></td>
              <td className='mx-2 my-3 h-3 bg-slate-300 dark:bg-slate-600 rounded-lg'></td>
              <td className='mx-2 my-3 h-3 bg-slate-300 dark:bg-slate-600 rounded-lg'></td>
            </tr>
          </thead>
          <tbody>
            <tr className='grid grid-cols-1 my-1'>
              <td className='mx-2 my-3 h-3 bg-slate-300 dark:bg-slate-600 rounded-lg'></td>
              <td className='mx-2 my-3 h-3 bg-slate-300 dark:bg-slate-600 rounded-lg'></td>
              <td className='mx-2 my-3 h-3 bg-slate-300 dark:bg-slate-600 rounded-lg'></td>
              <td className='mx-2 my-3 h-3 bg-slate-300 dark:bg-slate-600 rounded-lg'></td>
            </tr>
          </tbody>
        </table>
      )}
      {!isLoading && (
        <table className='w-full table-auto rounded'>
          <thead className=''>
            <tr className='leading-6 text-slate-900 dark:text-slate-700 text-sm border border-x-gray-200 border-b-gray-300 dark:border-b-gray-500 dark:border-gray-400 border-b-2 bg-gray-200 dark:bg-gray-400'>
              <th className='p-2 w-1/5 text-left'>ID</th>
              <th className='p-2 w-1/5 text-right'>Username</th>
              <th className='p-2 w-1/5 text-right'>Email</th>
              <th className='p-2 w-1/5 text-right'>Date Created</th>
              <th className='p-2 w-1/12 text-right'>Status</th>
              <th className='p-2 w-1/12 text-right'></th>
            </tr>
          </thead>
          <tbody className=''>
            {filterUsers.length === 0 && (
              <tr className='border border-gray-200 text-slate-700 text-sm leading-6'>
                <td className='p-2 w-full text-center'>No data</td>
              </tr>
            )}
            {filterUsers.length > 0 &&
              filterUsers.map(user => (
                <AccountTableRow key={user._id} user={user} />
              ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default AccountTable;
