import React from "react";
import { useAccountStore } from "../../pages/account/AccountState";

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
          <tr className="text-slate-700">
            <th className="p-2 w-1/5 text-left">ID</th>
            <th className="p-2 w-1/5 text-right">Username</th>
            <th className="p-2 w-1/5 text-right">Email</th>
            <th className="p-2 w-1/12 text-right">Status</th>
          </tr>
        </thead>
        <tbody className="bg-gray-50">
          {usersTemp.map((user) => (
            <tr key={user._id}>
              <td className="p-2 w-1/5 text-left">{user._id}</td>
              <td className="p-2 w-1/5 text-right">{user.username}</td>
              <td className="p-2 w-1/5 text-right">{user.email}</td>
              <td className="p-2 w-1/12 text-right capitalize">{user.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
};

export default AccountTable;
