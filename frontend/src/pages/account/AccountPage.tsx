import React from "react";
import AccountTable from "../../features/Account/AccountTable";
import { useAccountStore } from "./AccountState";

export type AccountPage = {};

const AccountPage: React.FC<AccountPage> = (props) => {

  const {
    getUsers,
  } = useAccountStore();

  React.useEffect(() => {
    const fnGetUsers = () => getUsers();
    fnGetUsers();
  }, []);

  return (
    <div>
      <div className="border border-0 bg-white p-4 rounded">
        Account Page
        
        <br/><br/>

        <AccountTable />

      </div>
    </div>
  )
};

export default AccountPage;
