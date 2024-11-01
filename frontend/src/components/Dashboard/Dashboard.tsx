import React from 'react';
import DashboardHeader from './DashboardHeader';
import DashboardFooter from './DashboardFooter';
import DashboardBody from './DashboardBody';

const Dashboard: React.FC = () => {
  return (
    <div className='flex flex-col h-screen font-satoshi'>
      <DashboardHeader />
      <DashboardBody />
      <DashboardFooter />
    </div>
  );
};

export default Dashboard;
