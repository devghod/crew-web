import React from 'react';

const DashboardFooter = () => {
  return (
    <div className="p-4 text-center border">
      &copy; {new Date().getFullYear()} My Dashboard
    </div>
  );
};

export default DashboardFooter;