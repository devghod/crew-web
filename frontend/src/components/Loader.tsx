import React from "react";

export interface Loader {};

const Loader: React.FC<Loader> = (props) => {
  
  return (
    <div className="flex items-center justify-center h-full">
      <svg className="w-16 h-16" viewBox="0 0 200 200">
        <circle fill="#FF156D" stroke="#FF156D" strokeWidth="15" r="15" cx="40" cy="100">
          <animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate>
        </circle>
        <circle fill="#FF156D" stroke="#FF156D" strokeWidth="15" r="15" cx="100" cy="100">
          <animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate>
        </circle>
        <circle fill="#FF156D" stroke="#FF156D" strokeWidth="15" r="15" cx="160" cy="100">
          <animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate>
        </circle>
      </svg>
    </div>
  )
};

export default Loader;
