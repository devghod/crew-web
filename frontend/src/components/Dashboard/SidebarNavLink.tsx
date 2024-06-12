import React from 'react';
import { useLocation, Link } from 'react-router-dom';

export type SidebarNavLink = {
  to: string;
  name: string;
  icon: React.ReactNode;
};

const SidebarNavLink: React.FC<SidebarNavLink> = ({ to, name, icon }) => {
  
  const location = useLocation();
  const isActivePath = (path: string) => {
    return location.pathname.endsWith(path);
  };
  
  return (
    <Link
      className={
        `flex rounded-full px-3 py-2 text-gray-500 font-semibold hover:text-gray-900 hover:bg-gray-100 ${
          isActivePath(to) ? 'bg-gray-200 text-gray-900' : ''
        }`
      }
      to={to}
    >
      <span className='mx-2'>{icon}</span>
      <span className='text-sm'>{name}</span>
    </Link>
  );
};

export default SidebarNavLink;