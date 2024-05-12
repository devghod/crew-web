import React from 'react';
import SidebarNavLink from './SidebarNavLink';
import { Navigates } from './Sidebar';

export interface SidebarNav {
  navigates: Navigates;
};

const SidebarNav: React.FC<SidebarNav> = ({ navigates }) => {
  
  return (
    <nav>
      <div className='flex flex-col gap-1 p-4'>
        {
          navigates.map((curr: any, idx: number) => (
            <SidebarNavLink key={idx} icon={curr.icon()} to={curr.path} name={curr.name} />
          ))
        }
      </div>
    </nav>
  );
};

export default SidebarNav;