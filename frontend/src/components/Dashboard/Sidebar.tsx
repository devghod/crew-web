import React from 'react';
import SidebarNav from './SidebarNav';
import SidebarProfile from './SidebarProfile';

const Sidebar = () => {
  const [ profile, setProfile ] = React.useState({});
  const [ loading, setLoading ] = React.useState(false);
  const [ navigates, setNavigates ] = React.useState([
    {
      name: 'Dashboard',
      path: '/dashboard',
    },
    {
      name: 'Todos',
      path: 'todos',
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
    <div className="shadow ease-in-out duration-300 h-full">
      <SidebarProfile profile={profile} isLoading={loading} />
      <SidebarNav navigates={navigates} />
    </div>
  );
};

export default Sidebar;