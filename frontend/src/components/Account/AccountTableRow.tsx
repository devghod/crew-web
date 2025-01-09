import { memo } from 'react';
import StatusPill from '../../components/StatusPill';
import { dateFormat } from '../../utils/dateHelper';
import { TUser } from '../../types/AccountType';

export type TAccountTableRow = {
  user: TUser;
};

const AccountTableRow = memo((props: TAccountTableRow) => {
  const { user } = props;

  return (
    <tr className='bg-gray-50 dark:bg-gray-200 border border-gray-200 dark:border-gray-300 text-slate-700 text-sm leading-6 hover:bg-gray-100'>
      <td className='p-2 w-1/5 text-left'>{user._id}</td>
      <td className='p-2 w-1/5 text-right'>{user.username}</td>
      <td className='p-2 w-1/5 text-right'>{user.email}</td>
      <td className='p-2 w-1/5 text-right'>
        {user?.date_created && dateFormat(user.date_created, 'YYYY-MM-DD')}
      </td>
      <td className='p-2 w-1/12 text-right capitalize'>
        <StatusPill data={user?.status} />
      </td>
      <td className='p-2 w-1/12 text-right capitalize'>
        action
      </td>
    </tr>
  );
});

export default AccountTableRow;
