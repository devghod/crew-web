import React from 'react';
import BlankProfile from '../../assets/blank-profile-picture.png';
import { useLoginStore } from "../../pages/login/LoginState";

export type Profile = {
  _id?: number,
  first_name?: string,
  last_name?: string,
  email?: string,
  image?: string,
};

export type SidebarProfile = Profile & {
  profile: Profile,
  isLoading: boolean,
};

const SidebarProfile: React.FC = () => {

  const { isLoading, profile } = useLoginStore();
  const [ user, setUser ] = React.useState<Profile>();

  React.useEffect(() => {
    setUser(profile);
  }, []);

  React.useMemo(() => {
    return profile;
  }, [profile]);
  
  return (
    <>
      {(isLoading) &&
        <div className="h-20 flex animate-pulse gap-2 items-center justify-center bg-slate-100 p-2 shadow shadow-inner">
          <div className="rounded-full bg-slate-200 h-16 w-16"></div>
          <div className="w-24">
            <div className="h-2 bg-slate-200 rounded mb-2"></div>
            <div className="h-2 bg-slate-200 rounded"></div>
          </div>
        </div>
      }
      {(!isLoading) &&
        <div className="h-20 flex gap-2 items-center justify-center bg-slate-100 p-2 shadow shadow-inner">
          <img 
            className="max-w-16 rounded-full bg-white" 
            src={
              user?.image && 
              user?.image !== '' ? 
              user.image : 
              BlankProfile 
            } 
            alt={`${user?.first_name} ${user?.last_name}`}
          />
          <div>
            <p className="text-sm font-bold max-w-24 text-pretty">{user?.first_name} {user?.last_name}</p>
            <p className="text-xs text-gray-500 max-w-24 truncate">{user?.email}</p>
          </div>
        </div>
      }
    </>
  );
};

export default SidebarProfile;