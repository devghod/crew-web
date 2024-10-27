import * as React from 'react';
import { TStatistics } from '../../types/AccountType';

export type AccountStats = {
  statistics: TStatistics;
};

const AccountStats: React.FC<AccountStats> = props => {
  const { statistics } = props;

  return (
    <div className='grid gap-x-4 grid-cols-4'>
      <div className='border border-0 bg-white p-4 rounded'>
        <div className='grid grid-cols-3'>
          <div className='grid grid-cols-1 gap-y-2 col-span-2'>
            <div className='leading-6 text-sm font-medium'>Active</div>
            <div className='leading-7 text-4xl font-medium'>
              {statistics.activeCount}
            </div>
          </div>
          <div className='justify-self-end'>
            <svg
              className='-mr-1 h-14 w-14 text-green-700 bg-green-100 rounded-full p-2'
              width='24'
              height='24'
              fill='none'
              viewBox='0 0 24 24'
            >
              <title>account</title>
              <path
                stroke='currentColor'
                fill='currentColor'
                d='M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z'
              />
            </svg>
          </div>
        </div>
      </div>
      <div className='border border-0 bg-white p-4 rounded'>
        <div className='grid grid-cols-3'>
          <div className='grid grid-cols-1 gap-y-2 col-span-2'>
            <div className='leading-6 text-sm font-medium'>Inactive</div>
            <div className='leading-7 text-4xl font-medium'>
              {statistics.inactiveCount}
            </div>
          </div>
          <div className='justify-self-end'>
            <svg
              className='-mr-1 h-14 w-14 text-red-700 bg-red-100 rounded-full p-2'
              width='24'
              height='24'
              fill='none'
              viewBox='0 0 24 24'
            >
              <title>account-off</title>
              <path
                stroke='currentColor'
                fill='currentColor'
                d='M12,4A4,4 0 0,1 16,8C16,9.95 14.6,11.58 12.75,11.93L8.07,7.25C8.42,5.4 10.05,4 12,4M12.28,14L18.28,20L20,21.72L18.73,23L15.73,20H4V18C4,16.16 6.5,14.61 9.87,14.14L2.78,7.05L4.05,5.78L12.28,14M20,18V19.18L15.14,14.32C18,14.93 20,16.35 20,18Z'
              />
            </svg>
          </div>
        </div>
      </div>
      <div className='border border-0 bg-white p-4 rounded col-span-2'>
        <div className='text-xs leading-relaxed flex'>
          <div className='mr-2 font-semibold text-blue-500'>
            {statistics.totalCount}
          </div>
          <div className=''>Total Accounts</div>
        </div>
        <div className='text-xs leading-relaxed flex'>
          <div className='mr-2 font-semibold text-gray-500'>
            {statistics.holdCount}
          </div>
          <div className=''>On hold</div>
        </div>
        <div className='text-xs leading-relaxed flex'>
          <div className='mr-2 font-semibold text-red-500'>
            {statistics.softDeleteCount}
          </div>
          <div className=''>Soft Delete</div>
        </div>
      </div>
    </div>
  );
};

export default AccountStats;
