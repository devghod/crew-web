import React from 'react';
import BlankProfile from '../../assets/blank-profile-picture.png';

const SidebarProfile = ({ profile, isLoading }: any) => {

  if (isLoading)  {
   return <div>Loading...</div>;
  }
  
  return (
    <div className="flex gap-2 items-center justify-center bg-slate-300 p-2 shadow shadow-inner">
      <img 
        className="max-w-16 rounded-full bg-white" 
        src={
          profile?.image && 
          profile?.image !== '' ? 
          profile.image : 
          BlankProfile 
        } 
        alt={profile.name} 
      />
      <div>
        <p className="text-sm font-bold">{profile.firstName} {profile.lastName}</p>
        <p className="text-xs text-gray-500">{profile.email}</p>
      </div>
    </div>
  );
};

export default SidebarProfile;