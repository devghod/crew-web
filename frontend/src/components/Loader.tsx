import React from "react";

export type Loader = {
  height: number,
  width: number,
  color: string,
};

const Loader: React.FC<Loader> = ({ height, width, color }) => {
  
  height ? height : height = 16;
  width ? width : width = 16;
  color ? color : color = "#FF156D";
  
  return (
    <div className="flex items-center justify-center h-full">
      <svg
        className={`w-${width} h-${height}`} 
        viewBox="0 0 200 200"
      >
        <circle fill={color} stroke={color} strokeWidth="15" r="15" cx="40" cy="100">
          <animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate>
        </circle>
        <circle fill={color} stroke={color} strokeWidth="15" r="15" cx="100" cy="100">
          <animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate>
        </circle>
        <circle fill={color} stroke={color} strokeWidth="15" r="15" cx="160" cy="100">
          <animate attributeName="opacity" calcMode="spline" dur="2" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate>
        </circle>
      </svg>
    </div>
  )
};

export default Loader;
