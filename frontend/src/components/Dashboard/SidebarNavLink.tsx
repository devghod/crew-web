import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const SidebarNavLink = ({ to, name }: any) => {
  const location = useLocation();
  const isActivePath = (path: string) => {
    return location.pathname.endsWith(path);
  };
  
  return (
    <Link
      className={
        `rounded-full px-3 py-2 text-gray-500 font-semibold hover:text-gray-900 hover:bg-gray-100 ${
          isActivePath(to) ? 'bg-gray-200 text-gray-900' : ''
        }`
      }
      to={to}
    >{name}</Link>
  );
};

export default SidebarNavLink;