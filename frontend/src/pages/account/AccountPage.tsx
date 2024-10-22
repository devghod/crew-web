import React from 'react'
import AccountTable from '../../features/Account/AccountTable'
import { useAccountStore } from '../../stores/AccountState'
import AccountStats from '../../components/Account/AccountStats'

export type AccountPage = {}

const AccountPage: React.FC<AccountPage> = () => {
  const { getUsers, statistics } = useAccountStore()

  React.useEffect(() => {
    const fnGetUsers = () => getUsers()
    fnGetUsers()
  }, [])

  return (
    <div className='grid gap-y-4 grid-cols-1'>
      <div className=''>
        <AccountStats statistics={statistics} />
      </div>
      <div className='border border-0 bg-white p-4 rounded'>
        <AccountTable />
      </div>
    </div>
  )
}

export default AccountPage
