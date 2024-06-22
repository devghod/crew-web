import React from "react";

export type RootPage = {};

const RootPage: React.FC<RootPage> = (props) => {
  
  return (
    <div className="w-full h-screen text-center content-center">
      <div className="">Hey, this is an awesome website to <span className="hover:text-sky-500">discover</span>.</div>
    </div>
  )
};

export default RootPage;
