import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const DashboardBody: React.FC = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex-initial w-64">
        <Sidebar />
      </div>
      <div className="flex-1 p-4 bg-gray-100 overflow-y-auto overflow-x-hidden">
        <Outlet />
      </div>
    </div> 
  );
};

export default DashboardBody;