import React from 'react';

export type DebtStats = {
  debtStats: object;
};

const DebtStats: React.FC<DebtStats> = props => {
  const { debtStats } = props;

  return (
    <div className='grid grid-cols-3 text-center text-sm text-slate-500'>
      <div className='text-sky-500'>
        Total Debts:
        <span className='ml-1 font-semibold'>{debtStats.total}</span>
      </div>
      <div className='text-lime-500'>
        Paid:
        <span className='ml-1 font-semibold'>{debtStats.paid}</span>
      </div>
      <div className='text-rose-500'>
        Unpaid:
        <span className='ml-1 font-semibold'>{debtStats.unpaid}</span>
      </div>
    </div>
  );
};

export default DebtStats;
