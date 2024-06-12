import React from "react";

export type DebtController = {
  open: () => void;
  debtTotal: number;
};

const DebtController: React.FC<DebtController> = (props) => {
  
  const { open, debtTotal } = props; 
  
  const onOpen = () => {
    open();
  };
  
  return (
    <div className="rounded container bg-white py-2 px-4">
      <div className="my-4 grid grid-cols-2">
        <div className="flex gap-x-4">
          <button 
            className="p-2 bg-sky-500 hover:bg-sky-700 rounded text-white flex gap-x-1"
            onClick={onOpen}
          >
            <svg className="self-center h-5 w-5" fill="currentColor" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>plus-circle</title>
              <path d="M17,13H13V17H11V13H7V11H11V7H13V11H17M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
            </svg>
            Create
          </button>
        </div>
        <div className="self-center">
          <h2 className="font-bold text-slate-500">
            Total Debts:
            <span className="ml-1">
              {debtTotal}
            </span>
          </h2>
        </div>
      </div>
    </div>
  )
};

export default DebtController;
