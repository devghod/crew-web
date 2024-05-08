import React from 'react';
import SidebarNavLink from './SidebarNavLink';

const SidebarNav = ({ navigates }: any) => {
  
  return (
    <nav>
      <div className='flex flex-col gap-1 p-4'>
        {
          navigates.map((curr: any, idx: number) => (
            <SidebarNavLink key={idx} to={curr.path} name={curr.name} />
          ))
        }
      </div>
    </nav>
  );
};

export default SidebarNav;