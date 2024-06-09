import React from "react";

export interface DebtDialogUpdateStatus {
  close: () => void;
  updateStatus: (id: number) => void;
  id: number;
};

const DebtDialogUpdateStatus: React.FC<DebtDialogUpdateStatus> = (props) => {

  const { close, updateStatus, id } = props;

  const handleUpdateStatus = () => {
    updateStatus(id);
  };
  
  return (
    <div className="bg-gray-900 bg-opacity-50 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-40 outline-none focus:outline-none">
      <div className="relative w-auto my-6 mx-auto max-w-3xl">
        <div className="w-full bg-white rounded-lg flex flex-col divide-y">
          <h2 className="text-lg font-bold px-4 py-3">Update Status</h2>
          <div className="p-4">
            <p className="text-right p-2">Are you sure you want to delete this?</p>
          </div>
          <div className="px-4 py-3 flex gap-x-2">
            <button 
              className="p-2 bg-sky-500 hover:bg-sky-700 rounded text-white"
              onClick={handleUpdateStatus}
            >
              Yes
            </button>
            <button 
              className="p-2 bg-red-500 hover:bg-red-700 rounded text-white"
              type="button"
              onClick={close}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  )
};

export default DebtDialogUpdateStatus;
