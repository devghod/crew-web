import React from 'react';

const DashboardFooter: React.FC = () => {
  return (
    <div className='p-4 text-center dark:text-slate-400 text-xs border-t dark:border-gray-700 dark:bg-gray-800 ease-in-out duration-500'>
      &copy; {new Date().getFullYear()} My Dashboard
    </div>
  );
};

export default DashboardFooter;
