import DashboardHeader from './DashboardHeader';
import DashboardFooter from './DashboardFooter';
import DashboardBody from './DashboardBody';

const Dashboard = () => {
  return (
    <div className='flex flex-col h-screen font-satoshi'>
      <DashboardHeader />
      <DashboardBody />
      <DashboardFooter />
    </div>
  );
};

export default Dashboard;
