import React from 'react';
import BlankProfile from '../../assets/blank-profile-picture.png';
import Loader from '../Loader';

export interface Profile {
  id: number,
  firstName: string,
  lastName: string,
  name: string,
  email: string,
  image: string,
};

export interface SidebarProfile {
  profile: Profile,
  isLoading: boolean,
};

const SidebarProfile: React.FC<SidebarProfile> = ({ profile, isLoading }) => {
  
  return (
    <>
      {(isLoading) &&
        <div className='items-center justify-center bg-slate-100 text-center shadow shadow-inner text-sm'>
          <Loader height={10} width={10} color="" />
        </div>
      }
      {(!isLoading) &&
        <div className="flex gap-2 items-center justify-center bg-slate-100 p-2 shadow shadow-inner">
          <img 
            className="max-w-16 rounded-full bg-white" 
            src={
              profile?.image && 
              profile?.image !== '' ? 
              profile.image : 
              BlankProfile 
            } 
            alt={profile?.name} 
          />
          <div>
            <p className="text-sm font-bold max-w-24 text-pretty">{profile?.firstName} {profile?.lastName}</p>
            <p className="text-xs text-gray-500 max-w-24 truncate">{profile?.email}</p>
          </div>
        </div>
      }
    </>
  );
};

export default SidebarProfile;