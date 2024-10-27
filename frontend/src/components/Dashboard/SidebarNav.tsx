import React from 'react';
import SidebarNavLink from './SidebarNavLink';
import { Navigates, Navigate } from './Sidebar';

export type SidebarNav = {
  navigates: Navigates;
  shrink: boolean;
};

const SidebarNav: React.FC<SidebarNav> = ({ navigates, shrink }) => {
  return (
    <nav>
      <div className='flex flex-col gap-1 p-4'>
        {navigates.map((curr: Navigate, idx: number) => (
          <SidebarNavLink
            key={idx}
            icon={curr.icon}
            to={curr.path}
            name={curr.name}
            shrink={shrink}
          />
        ))}
      </div>
    </nav>
  );
};

export default SidebarNav;
