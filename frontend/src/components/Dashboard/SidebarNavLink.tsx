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
        `flex rounded-full px-3 py-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 tracking-wide 
        ${isActivePath(to) && 'font-bold text-gray-900 border border-gray-50 shadow'}
        ${!isActivePath(to) && 'font-normal'}
        `
      }
      to={to}
    >
      <span className='mr-4'>{icon}</span>
      <span className='text-sm'>{name}</span>
    </Link>
  );
};

export default SidebarNavLink;