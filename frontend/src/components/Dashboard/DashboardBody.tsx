import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';

export type DashboardBody = {};

const DashboardBody: React.FC<DashboardBody> = () => {

  const [ shrink, setShrink ] = React.useState(false);
  const location = useLocation();
  const path = location.pathname.split('/').filter(Boolean);

  const handleShrink = () => shrink ? setShrink(false) : setShrink(true);

  return (
    <div className="flex h-screen overflow-hidden">
      <div className={`flex-initial 
        ${shrink && 'w-20'}
        ${!shrink && 'w-64'}`
      }
      >
        <Sidebar 
          handleShrink={handleShrink} 
          shrink={shrink}
        />
      </div>
      <div className="flex-1 px-4 bg-gray-100 overflow-y-auto overflow-x-hidden">
        <div className="my-2">
          <Pathname path={path} />
        </div>
        <Outlet />
      </div>
    </div> 
  );
};

export default DashboardBody;

const Pathname = (data: any) => {

  const { path } = data;
  const lengthIndex = path.length - 1;

  return (
    <div className="flex">
      {
        path.map((item: string, index: number) => {
          return (
            <div key={index} className="">
              <span key={index} className="font-medium text-xs text-gray-400 hover:text-gray-900 capitalize">
                {item} 
              </span>
              {(lengthIndex > 0 && lengthIndex != index) && 
              (
                <span className="text-gray-400">
                  <svg 
                    className="h-3 w-3 inline" 
                    width="24" 
                    height="24" 
                    fill="none" 
                    viewBox="0 0 24 24"
                  >
                    <title>chevron-right</title>
                    <path 
                      stroke="currentColor" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" 
                    />
                  </svg>
                </span>
              )}
            </div>
          )
        })
      }
    </div>
  );
};