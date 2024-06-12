import React from "react";

export type StatusPill = {
  data: String;
};

const StatusPill: React.FC<StatusPill> = ({ data }) => {
  
  const statusColor = (data: string) => {
    let temp = data.toLowerCase();

    switch (temp) {
      case 'paid':
        return 'text-white bg-blue-500';
      
      case 'unpaid':
        return 'text-white bg-red-500';
    
      default:
        return 'text-black bg-gray-200';
    }
  };

  return (
    <div 
      className={
        `text-sm px-2 py-1 inline-block rounded-full ${statusColor(data)}`
      }
    >
      {data}
    </div>
  )
};

export default StatusPill;
