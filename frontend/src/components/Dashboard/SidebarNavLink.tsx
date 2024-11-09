import React from 'react';
import { useLocation, Link } from 'react-router-dom';

export type SidebarNavLink = {
  to: string;
  name: string;
  icon: () => React.ReactNode;
  shrink: boolean;
};

const SidebarNavLink: React.FC<SidebarNavLink> = props => {
  const { to, name, icon, shrink } = props;
  const location = useLocation();
  const isActivePath = (path: string) => {
    return location.pathname.endsWith(path);
  };

  return (
    <Link
      className={`flex rounded-lg px-3 py-2 text-gray-500 tracking-wide 
        ${isActivePath(to) && 'font-bold text-violet-600 dark:text-violet-400 bg-violet-300/50 dark:bg-violet-300/25 shadow'}
        ${!isActivePath(to) && 'font-normal dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-500'}`}
      to={to}
    >
      <span className='mr-4'>{icon()}</span>
      {!shrink && <span className='text-sm'>{name}</span>}
    </Link>
  );
};

export default SidebarNavLink;
