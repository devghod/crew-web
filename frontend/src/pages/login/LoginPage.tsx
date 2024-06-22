import React from "react";

export type LoginPage = {};

const LoginPage: React.FC<LoginPage> = (props) => {

  const [ temp, setTemp ] = React.useState({
    name: "Crew",
    logo: "../../../public/crew-logo.png",
  });
  
  return (
    <div className="w-full h-screen grid grid-cols-4 content-center">
      <div className="col-start-2 col-span-2">
        <div className="max-w-96 rounded-lg shadow text-slate-500 mx-auto divide-y border">
          <div className="">
            <div className="px-4 py-6 text-center">
              <img src={temp.logo} alt={temp.name} className="w-24 mx-auto" />
              <div className="text-xs">
                {temp.name} Login
              </div>            
            </div>
          </div>
          <div className="">
            <div className="p-6">
              <label className="text-xs tracking-wider" htmlFor="username">Username / Email / Mobile</label>
              <div className="mt-px">
                <input 
                  className="w-full text-sm border px-3 py-2 shadow-inner rounded-full" 
                  id="username" 
                  placeholder="Username / Email / Mobile" 
                />
              </div>
              <label className="text-xs tracking-wider" htmlFor="password">Password</label>
              <div className="mt-px">
                <input 
                  className="w-full text-sm border px-3 py-2 shadow-inner rounded-full" 
                  id="password" 
                  placeholder="Password" 
                  type="password"
                />
              </div>
              <div className="mt-3">
                <div className="grid grid-cols-2">
                  <div className="self-center">
                    <button 
                      className="text-xs text-sky-500 hover:text-sky-700 p-2"
                    >Sign Up?</button>
                  </div>
                  <div className="text-right">
                    <button 
                      className="bg-sky-500 hover:bg-sky-700 text-white px-3 py-2 rounded"
                    >
                      <div className="flex text-sm">
                        <svg className="h-5 w-5 mr-1" viewBox="0 0 24 24" fill="currentColor">
                          <title>login</title>
                          <path d="M11 7L9.6 8.4L12.2 11H2V13H12.2L9.6 15.6L11 17L16 12L11 7M20 19H12V21H20C21.1 21 22 20.1 22 19V5C22 3.9 21.1 3 20 3H12V5H20V19Z" />
                        </svg>
                        Sign In
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default LoginPage;
