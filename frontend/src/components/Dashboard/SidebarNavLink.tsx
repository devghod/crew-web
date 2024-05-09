import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const SidebarNavLink: React.FC = ({ to, name, icon }: any) => {
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
      <span>{name}</span>
    </Link>
  );
};

export default SidebarNavLink;