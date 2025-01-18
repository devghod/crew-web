import { useState, ChangeEvent, useEffect } from 'react';
import { TCreateUser } from '../../types/AccountType';
import { useAccountStore } from '../../stores/accountStore';
import { LoadingIcon } from '../../utils/icons';

type TAccountForm = {
  type?: 'create' | 'update' | undefined;
  data?: TCreateUser;
  handleModal: () => void;
};

const AccountForm = (props: TAccountForm) => {
  const { type, data, handleModal } = props;
  const { createUser, isLoading, message } = useAccountStore();
  const [account, setAccount] = useState<TCreateUser>({
    username: '',
    email: '',
    status: 'inactive', // default
    password: '',
    first_name: '',
    middle_name: '',
    last_name: '',
  });

  useEffect(() => {
    if (!type || type === 'create') {
      setAccount({
        username: '',
        email: '',
        status: 'inactive', // default
        first_name: '',
        middle_name: '',
        last_name: '',
        password: '',
      });
    } else {
      data && setAccount(data);
    }
  }, [data, type]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { id, value } = event.target;
    setAccount({ ...account, [id]: value });
  }

  async function submit() {
    const result = await createUser(account);
    if (result) handleModal();
  }

  return (
    <>
      {message && (
        <p className='w-full text-center text-rose-500 bg-rose-500/10 p-1 block'>
          {message}
        </p>
      )}
      <div className='grid grid-cols-7 gap-4 py-8 dark:bg-slate-600 dark:text-slate-300'>
        <div className='col-span-2 text-right'>
          <label htmlFor='first_name'>First Name</label>
        </div>
        <div className='col-span-4'>
          <input
            className='w-full border rounded-lg px-2 py-1 text-slate-800 dark:bg-gray-100'
            type='text'
            id='first_name'
            name='first_name'
            placeholder='First Name'
            value={account.first_name}
            onChange={event => handleChange(event)}
          />
        </div>
        <div className='col-span-2 text-right'>
          <label htmlFor='middle_name'>Middle Name</label>
        </div>
        <div className='col-span-4'>
          <input
            className='w-full border rounded-lg px-2 py-1 text-slate-800 dark:bg-gray-100'
            type='text'
            id='middle_name'
            name='middle_name'
            placeholder='Middle Name'
            value={account.middle_name}
            onChange={event => handleChange(event)}
          />
        </div>
        <div className='col-span-2 text-right'>
          <label htmlFor='last_name'>Last Name</label>
        </div>
        <div className='col-span-4'>
          <input
            className='w-full border rounded-lg px-2 py-1 text-slate-800 dark:bg-gray-100'
            type='text'
            id='last_name'
            name='last_name'
            placeholder='Last Name'
            value={account.last_name}
            onChange={event => handleChange(event)}
          />
        </div>
        <div className='col-span-2 text-right'>
          <label htmlFor='username'>Username</label>
        </div>
        <div className='col-span-4'>
          <input
            className='w-full border rounded-lg px-2 py-1 text-slate-800 dark:bg-gray-100'
            type='text'
            id='username'
            name='username'
            placeholder='Username'
            value={account.username}
            onChange={event => handleChange(event)}
          />
        </div>
        <div className='col-span-2 text-right'>
          <label htmlFor='email'>Email</label>
        </div>
        <div className='col-span-4'>
          <input
            className='w-full border rounded-lg px-2 py-1 text-slate-800 dark:bg-gray-100'
            type='email'
            id='email'
            name='email'
            placeholder='Email'
            value={account.email}
            onChange={event => handleChange(event)}
          />
        </div>
      </div>

      <div className='grid grid-cols-7 gap-4 pb-8 dark:bg-slate-600 rounded-b-lg'>
        <div className='col-end-4'>
          <button
            className='bg-sky-500 hover:bg-sky-500/75 rounded-lg px-4 py-1 text-slate-100 tracking-wide'
            disabled={isLoading}
            onClick={submit}
          >
            {isLoading ? <LoadingIcon /> : 'Submit'}
          </button>
        </div>
      </div>
    </>
  );
};

export default AccountForm;
