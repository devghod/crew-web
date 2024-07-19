import React from 'react';
import SidebarNav from './SidebarNav';
import SidebarProfile, { Profile } from './SidebarProfile';

export type Navigate = {
  name: string;
  path: string;
  icon: Function;
};

export type Navigates = Array<Navigate> & {};

const Sidebar: React.FC = () => {
  
  const [ loading, setLoading ] = React.useState(false);
  const [ profile, setProfile ] = React.useState<Profile>({
    id: 0,
    firstName: '',
    lastName: '',
    name: '',
    email: '',
    image: '',
  });
  const [ navigates, setNavigates ] = React.useState<Navigates>([
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
    // {
    //   name: 'Todos',
    //   path: 'todos',
    //   icon: () => (
    //     <svg className="-mr-1 h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    //       <title>list-box</title>
    //       <path fillRule="evenodd" d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3M7 7H9V9H7V7M7 11H9V13H7V11M7 15H9V17H7V15M17 17H11V15H17V17M17 13H11V11H17V13M17 9H11V7H17V9Z" />
    //     </svg>
    //   )
    // },
    {
      name: 'Debt Central',
      path: 'debt',
      icon: () => (
        <svg className="-mr-1 h-5 w-5" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4"/>
        </svg>
      )
    },
    {
      name: 'Inventory Central',
      path: 'inventory',
      icon: () => (
        <svg className="-mr-1 h-5 w-5" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12,3C7.58,3 4,4.79 4,7C4,9.21 7.58,11 12,11C16.42,11 20,9.21 20,7C20,4.79 16.42,3 12,3M4,9V12C4,14.21 7.58,16 12,16C16.42,16 20,14.21 20,12V9C20,11.21 16.42,13 12,13C7.58,13 4,11.21 4,9M4,14V17C4,19.21 7.58,21 12,21C16.42,21 20,19.21 20,17V14C20,16.21 16.42,18 12,18C7.58,18 4,16.21 4,14Z" />
        </svg>
      )
    },
  ]);

  const getProfile = () => {
    setLoading(true);
    setTimeout(() => {
      setProfile({
        id: 100,
        firstName: 'Hanzo',
        lastName: 'Hattori',
        name: 'Hanzo Hattori',
        email: 'hanzo.hattor@test.com',
        image: '',
      });
      setLoading(false);
    }, 3000);    
  };

  React.useEffect(() => {
    // setLoading(true);
    // fetch(`https://dummyjson.com/users/${randomNumber}`)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setProfile(data);
    //     setLoading(false);
    //   })
    //   .catch((error) => console.error('Error:', error));
    getProfile();
  }, []);

  return (
    <div className="border-r shadow ease-in-out duration-300 h-full">
      <SidebarProfile profile={profile} isLoading={loading} />
      <SidebarNav navigates={navigates} />
    </div>
  );
};

export default Sidebar;