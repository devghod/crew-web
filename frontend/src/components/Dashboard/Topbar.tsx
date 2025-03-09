import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/RouteController/Auth';
import { useAuthStore } from '../../stores/authStore';
import { TAuthContext } from '../../utils/RouteController/AuthProvider';
import { TCompany } from '../../types/CompanyType';
import LightSwitch from './LightSwitch';
import Logo from '../../assets/logos/crew-sm.png';

const Topbar = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [company, setCompany] = useState<TCompany>();
  const { logout: signout }: TAuthContext = useAuth();
  const { token, refreshToken } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        !event ||
        !(event.target as HTMLElement) ||
        !(event.target as HTMLElement).closest(
          '.relative.inline-block.text-left',
        )
      ) {
        setShowOptions(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [showOptions]);

  useEffect(() => {
    const handleCompany = () => {
      setCompany({
        _id: '1',
        logo: Logo,
        name: '',
        description: 'CREW Logo',
        address: '',
        phone: '',
        email: '',
        website: '',
      });
    };

    handleCompany();
  }, []);

  const onShowOptions = () => {
    if (showOptions) {
      setShowOptions(false);
    } else {
      setShowOptions(true);
    }
  };

  const handleSignOut = async () => {
    signout && signout();

    if (!token && !refreshToken) {
      navigate('/login');
      window.location.href = '/login';
    }
  };

  return (
    <div className='grid grid-cols-6 gap-4 border-b h-20 dark:border-gray-700 dark:bg-gray-800 ease-in-out duration-500'>
      <div className='col-start-1 col-end-3 self-center mx-5'>
        <img
          className='max-w-24'
          src={company?.logo ? company.logo : ''}
          alt={company?.description ? company.description : ''}
        />
      </div>
      <div className='col-end-7 col-span-1 self-center'>
        <div className='flex space-x-4 justify-end mx-5'>
          <div className='self-center'></div>
          <div className='relative inline-block text-left content-center'>
            <LightSwitch />
          </div>
          <div className='relative inline-block text-left'>
            <div>
              <button
                onClick={onShowOptions}
                type='button'
                className='inline-flex w-full justify-center gap-x-1.5 rounded-full px-3 py-2'
                id='menu-button'
                aria-expanded='true'
                aria-haspopup='true'
              >
                <svg
                  className='-mr-1 h-5 w-5 text-gray-400'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  aria-hidden='true'
                >
                  <title>dots-vertical</title>
                  <path
                    fillRule='evenodd'
                    d='M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z'
                  />
                </svg>
              </button>
            </div>
            <div
              className={
                showOptions
                  ? 'absolute right-0 z-10 mt-2 w-56 origin-top-right text-slate-600 dark:text-slate-400 rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
                  : 'hidden'
              }
              role='menu'
              aria-orientation='vertical'
              aria-labelledby='menu-button'
            >
              <div className='py-1' role='none'>
                <a
                  href='#'
                  className='hover:bg-gray-200 dark:hover:bg-yellow-500/20 block px-4 py-2 text-sm'
                  role='menuitem'
                  id='menu-item-0'
                >
                  Profile
                </a>
                <a
                  href='#'
                  className='hover:bg-gray-200 dark:hover:bg-yellow-500/20 block px-4 py-2 text-sm'
                  role='menuitem'
                  id='menu-item-1'
                >
                  Settings
                </a>
                <a
                  href='#'
                  className='hover:bg-gray-200 dark:hover:bg-yellow-500/20 block px-4 py-2 text-sm'
                  role='menuitem'
                  id='menu-item-2'
                >
                  Support
                </a>
                <a
                  href='#'
                  className='hover:bg-gray-200 dark:hover:bg-yellow-500/20 block px-4 py-2 text-sm'
                  role='menuitem'
                  id='menu-item-3'
                >
                  License
                </a>
                <button
                  onClick={() => handleSignOut()}
                  className='hover:bg-gray-200 dark:hover:bg-yellow-500/20 block w-full px-4 py-2 text-left text-sm'
                  role='menuitem'
                  id='menu-item-3'
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
