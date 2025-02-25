import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';

const DashboardBody: React.FC = () => {
  const [shrink, setShrink] = React.useState(false);
  const location = useLocation();
  const path = location.pathname.split('/').filter(Boolean);

  const handleShrink = () => (shrink ? setShrink(false) : setShrink(true));

  return (
    <div className='flex h-screen overflow-hidden'>
      <div
        className={`flex-initial transition-width duration-700
        ${shrink && 'w-20'}
        ${!shrink && 'w-64'}`}
      >
        <Sidebar handleShrink={handleShrink} shrink={shrink} />
      </div>
      <div className='flex-1 px-4 bg-gray-100 dark:bg-gray-800/75 overflow-y-auto overflow-x-hidden'>
        <div className='my-2'>
          <Pathname path={path} />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardBody;

type TData = {
  path: string[];
};

const Pathname = (data: TData) => {
  const { path } = data;
  const lengthIndex = path.length - 1;

  return (
    <div className='flex'>
      {path.map((item: string, index: number) => {
        return (
          <div key={index} className=''>
            <span
              key={index}
              className='font-medium text-xs text-gray-400 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-200 capitalize'
            >
              {item}
            </span>
            {lengthIndex > 0 && lengthIndex != index && (
              <span className='text-gray-400 mx-1'>
                <svg
                  className='h-3 w-3 inline'
                  width='24'
                  height='24'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <title>chevron-right</title>
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z'
                  />
                </svg>
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};
