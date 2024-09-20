import React from "react";

export type StatusPill = {
  data: String;
};

const StatusPill: React.FC<StatusPill> = (props) => {

  const { data } = props; 
  const statusColor = (data: string) => {
    let temp = data ? data.toLowerCase() : '';

    switch (temp) {
      case 'paid':
        return 'text-white bg-blue-500';
      
      case 'active':
        return 'text-blue-500 bg-blue-100 border border-1 border-blue-500 text-xs';
      
      case 'unpaid':
        return 'text-white bg-red-500';

      case 'inactive':
        return 'text-red-500 bg-red-100 border border-1 border-red-500 text-xs';
    
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
