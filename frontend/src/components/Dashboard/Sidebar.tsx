import React from 'react';
import SidebarNav from './SidebarNav';
import SidebarProfile from './SidebarProfile';

const Sidebar: React.FC = () => {
  const [ profile, setProfile ] = React.useState({});
  const [ loading, setLoading ] = React.useState(false);
  const [ navigates, setNavigates ] = React.useState([
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: () => (
        <svg className="-mr-1 h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <title>view-dashboard</title>
          <path fillRule="evenodd" d="M13,3V9H21V3M13,21H21V11H13M3,21H11V15H3M3,13H11V3H3V13Z" />
        </svg>
      )
    },
    {
      name: 'Todos',
      path: 'todos',
      icon: () => (
        <svg className="-mr-1 h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <title>list-box</title>
          <path fillRule="evenodd" d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3M7 7H9V9H7V7M7 11H9V13H7V11M7 15H9V17H7V15M17 17H11V15H17V17M17 13H11V11H17V13M17 9H11V7H17V9Z" />
        </svg>
      )
    }
  ]);

  const randomNumber = Math.floor(Math.random() * 101);

  React.useEffect(() => {
    setLoading(true);
    fetch(`https://dummyjson.com/users/${randomNumber}`)
      .then((response) => response.json())
      .then((data) => {
        setProfile(data);
        setLoading(false);
      })
      .catch((error) => console.error('Error:', error));
  }, []);

  return (
    <div className="border-r shadow ease-in-out duration-300 h-full">
      <SidebarProfile profile={profile} isLoading={loading} />
      <SidebarNav navigates={navigates} />
    </div>
  );
};

export default Sidebar;