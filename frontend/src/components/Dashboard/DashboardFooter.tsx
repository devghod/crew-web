import React from 'react';

const DashboardFooter = () => {
  return (
    <div className="bg-gray-200 p-4 text-center">
      &copy; {new Date().getFullYear()} My Dashboard
    </div>
  );
};

export default DashboardFooter;