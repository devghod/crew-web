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
    <>
      <table className="w-full table-auto rounded">
        <thead className="">
          <tr className="text-slate-900 text-sm border border-x-gray-200 border-t-gray-200 border-x-gray-200">
            <th className="p-2 text-left">Accounts</th>
          </tr>
          <tr className="leading-6 text-slate-900 text-sm border border-x-gray-200 border-b-gray-300 border-b-2 bg-gray-200">
            <th className="p-2 w-1/5 text-left">ID</th>
            <th className="p-2 w-1/5 text-right">Username</th>
            <th className="p-2 w-1/5 text-right">Email</th>
            <th className="p-2 w-1/5 text-right">Date Created</th>
            <th className="p-2 w-1/12 text-right">Status</th>
          </tr>
        </thead>
        <tbody className="bg-gray-50">
          {isLoading && (
            <tr className="border border-gray-200 text-slate-700 text-sm leading-6">
              <td className="p-2 w-1/5 text-center">Loading...</td>
            </tr>
          )}
          {(!isLoading && usersTemp.length === 0) && (
            <tr className="border border-gray-200 text-slate-700 text-sm leading-6">
              <td className="p-2 w-full text-center">No data</td>
            </tr>
          )}
          {(!isLoading && usersTemp.length > 0) && usersTemp.map((user) => (
            <AccountTableRow key={user._id} user={user} />
          ))}
        </tbody>
      </table>
    </>
  )
};

export default AccountTable;
