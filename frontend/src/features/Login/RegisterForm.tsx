import React from 'react';
import { useAuthStore } from '../../stores/authStore';

export type RegisterForm = {
  isLoading: boolean;
  handleFormType: () => void;
  formType: string;
};

const RegisterForm: React.FC<RegisterForm> = props => {
  const { isLoading, handleFormType } = props;

  const { register, registration, setFormDataRegistration } = useAuthStore();

  const onRegister = async () => {
    register();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id } = event.target;
    setFormDataRegistration({ ...registration, [id]: value });
  };

  return (
    <div className='p-6'>
      <label
        className='text-slate-700 text-xs tracking-wider'
        htmlFor='username'
      >
        Username
      </label>
      <div className='mt-px'>
        <input
          className='w-full text-sm border px-3 py-2 shadow-inner rounded-full'
          id='username'
          placeholder='Username'
          disabled={isLoading}
          value={registration.username}
          onChange={handleInputChange}
        />
      </div>
      <label
        className='text-slate-700 text-xs tracking-wider'
        htmlFor='username'
      >
        Email
      </label>
      <div className='mt-px'>
        <input
          className='w-full text-sm border px-3 py-2 shadow-inner rounded-full'
          id='email'
          placeholder='Email'
          disabled={isLoading}
          value={registration.email}
          onChange={handleInputChange}
        />
      </div>
      <label
        className='text-slate-700 text-xs tracking-wider'
        htmlFor='username'
      >
        Mobile
      </label>
      <div className='mt-px'>
        <input
          className='w-full text-sm border px-3 py-2 shadow-inner rounded-full'
          id='mobile'
          placeholder='Mobile'
          disabled={isLoading}
          value={registration.mobile}
          onChange={handleInputChange}
        />
      </div>
      <label
        className='text-slate-700 text-xs tracking-wider'
        htmlFor='password'
      >
        Password
      </label>
      <div className='mt-px'>
        <input
          className='w-full text-sm border px-3 py-2 shadow-inner rounded-full'
          id='password'
          placeholder='Password'
          type='password'
          disabled={isLoading}
          value={registration.password}
          onChange={handleInputChange}
        />
      </div>
      <label
        className='text-slate-700 text-xs tracking-wider'
        htmlFor='password'
      >
        Confirm Password
      </label>
      <div className='mt-px'>
        <input
          className='w-full text-sm border px-3 py-2 shadow-inner rounded-full'
          id='confirmPassword'
          placeholder='Confirm Password'
          type='password'
          disabled={isLoading}
          value={registration.confirmPassword}
          onChange={handleInputChange}
        />
      </div>
      <div className='mt-3'>
        <div className='grid grid-cols-2'>
          <div className='self-center'>
            <button
              className='text-xs text-teal-500 hover:text-teal-700 p-2'
              disabled={isLoading}
              onClick={handleFormType}
            >
              Sign In?
            </button>
          </div>
          <div className='text-right'>
            <button
              onClick={onRegister}
              disabled={isLoading}
              className='bg-teal-500 hover:bg-teal-700 text-white px-3 py-2 rounded'
            >
              <div className='flex text-sm'>
                {isLoading ? (
                  <svg
                    aria-hidden='true'
                    className='w-5 h-5 mr-1 text-gray-300 animate-spin dark:text-gray-300 fill-white'
                    viewBox='0 0 100 101'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                      fill='currentColor'
                      strokeWidth='4'
                    />
                    <path
                      d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                      fill='currentFill'
                      strokeWidth='4'
                    />
                  </svg>
                ) : (
                  <svg
                    className='h-5 w-5 mr-1'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                  >
                    <title>login</title>
                    <path d='M11 7L9.6 8.4L12.2 11H2V13H12.2L9.6 15.6L11 17L16 12L11 7M20 19H12V21H20C21.1 21 22 20.1 22 19V5C22 3.9 21.1 3 20 3H12V5H20V19Z' />
                  </svg>
                )}
                Sign Up
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
