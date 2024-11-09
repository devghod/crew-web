import { useEffect, useState } from 'react';
import BlankProfile from '../../assets/blank-profile-picture.png';
import { useLoginStore } from '../../stores/loginStore';

export type Profile = {
  _id?: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  image?: string;
};

// export type SidebarProfile = Profile & {
// profile: Profile,
export type SidebarProfile = {
  shrink: boolean;
  handleShrink: () => void;
};

const SidebarProfile = (props: SidebarProfile) => {
  const { handleShrink, shrink } = props;
  const { isLoading, profile } = useLoginStore();
  const [user, setUser] = useState<Profile>();

  useEffect(() => {
    setUser(profile);
  }, [profile]);

  return (
    <>
      {isLoading && (
        <div className='h-20 flex animate-pulse gap-2 items-center justify-center bg-slate-100 p-2 shadow shadow-inner'>
          <div className='rounded-full bg-slate-200 h-16 w-16'></div>
          <div className='w-24'>
            <div className='h-2 bg-slate-200 rounded mb-2'></div>
            <div className='h-2 bg-slate-200 rounded'></div>
          </div>
        </div>
      )}
      {!isLoading && (
        <div
          className={`h-20 grid items-center bg-gray-100 dark:bg-gray-300 shadow shadow-inner
            ${shrink && 'grid-cols-5'}
            ${!shrink && 'grid-cols-7 pl-2 gap-2'}`}
        >
          {shrink && <div></div>}
          <div
            className={`transition-width duration-700
              ${shrink && 'col-span-3'}
              ${!shrink && 'col-span-2'}`}
          >
            <img
              className={`rounded-full bg-white h-full transition-width duration-700 ease-in-out
                ${shrink && 'w-12'}
                ${!shrink && 'w-16'}`}
              src={
                user?.image && user?.image !== '' ? user.image : BlankProfile
              }
              alt={`${user?.first_name} ${user?.last_name}`}
            />
          </div>
          <div
            className={`col-span-4 transition-all transition-visibility duration-700
              ${shrink && 'hidden'}`}
          >
            <p className='text-sm font-bold max-w- text-pretty'>
              {user?.first_name} {user?.last_name}
            </p>
            <p className='text-xs text-gray-500 max-w-30 truncate'>
              {user?.email}
            </p>
          </div>
          <div className='col-span-1 mb-auto justify-self-end'>
            <button
              type='button'
              className='p-1 rounded-l text-slate-700 bg-slate-200 hover:bg-slate-300'
              onClick={() => handleShrink()}
            >
              {!shrink && (
                <svg
                  className='h-3'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  aria-hidden='true'
                >
                  <path
                    fillRule='evenodd'
                    d='M20,22H22V2H20V11H5.83L11.33,5.5L9.92,4.08L2,12L9.92,19.92L11.33,18.5L5.83,13H20V22Z'
                  />
                </svg>
              )}
              {shrink && (
                <svg
                  className='h-3'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  aria-hidden='true'
                >
                  <path
                    fillRule='evenodd'
                    d='M4,2H2V22H4V13H18.17L12.67,18.5L14.08,19.92L22,12L14.08,4.08L12.67,5.5L18.17,11H4V2Z'
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SidebarProfile;
