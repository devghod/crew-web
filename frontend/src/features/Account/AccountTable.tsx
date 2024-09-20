import React from "react";
import { useAccountStore } from "../../pages/account/AccountState";
import { dateFormat } from '../../utils/dateHelper';
import AccountTableRow from '../../components/Account/AccountTableRow';

export type AccountTable = {};

const AccountTable: React.FC<AccountTable> = (props) => {

  const {
    users,
    isLoading,
  } = useAccountStore();

  const [ usersTemp, setUsersTemp ] = React.useState(users);

  React.useMemo(() => {
    setUsersTemp(users)
  }, [users]);
  
  return (
    <div>
      <table className="w-full table-auto">
        <thead className="bg-gray-300">
          <tr className="text-slate-700 text-sm border border-gray-300">
            <th className="p-2 w-1/5 text-left">ID</th>
            <th className="p-2 w-1/5 text-right">Username</th>
            <th className="p-2 w-1/5 text-right">Email</th>
            <th className="p-2 w-1/5 text-right">Date Created</th>
            <th className="p-2 w-1/12 text-right">Status</th>
          </tr>
        </thead>
        <tbody className="bg-gray-50">
          {usersTemp.map((user) => (
            <AccountTableRow key={user._id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  )
};

export default AccountTable;
