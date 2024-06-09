import React from "react";
import { Debt } from "../../pages/debt/DebtInterface";

export interface DebtModalFormEdit {
  close: () => void;
  debt: Debt;
  isLoading: boolean;
};

const DebtModalFormEdit: React.FC<DebtModalFormEdit> = (props) => {

  const { debt, isLoading, close } = props;

  console.log(`%c ${isLoading}`, "color: red");
  console.log("debt", debt);
  
  return (
    <div className="bg-gray-900 bg-opacity-50 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-40 outline-none focus:outline-none">
      <div className="relative w-auto my-6 mx-auto max-w-3xl">
        <div className="w-full bg-white rounded-lg flex flex-col divide-y">
          <h2 className="text-lg font-bold px-4 py-3">Edit Form</h2>
          <div className="grid grid-cols-4 gap-4 p-4">
            <div className="text-right p-2">Name</div>
            <div className="col-span-3">
              <input 
                className="w-full border rounded p-2" 
                placeholder="Name here" 
                value={debt.name} 
                // onChange={(e) => setForm({ ...form, name: e.target.value})} 
              />
            </div>
            <div className="text-right p-2">Amount</div>
            <div className="col-span-3">
              <input 
                className="w-full border rounded p-2" 
                placeholder="00" 
                type="number"
                value={debt.amount} 
                // onChange={(e) => setForm({ ...form, amount: e.target.value})} 
              />
            </div>
            <div className="text-right p-2">Due Date</div>
            <div className="col-span-3">
              <input 
                className="w-full border rounded p-2" 
                placeholder="MM/DD/YYYY" 
                type="date"
                value={debt.dueDate} 
                // onChange={(e) => setForm({ ...form, dueDate: e.target.value})} 
              />
            </div>
          </div>
          <div className="px-4 py-3 flex gap-x-2">
            <button 
              className="p-2 bg-sky-500 hover:bg-sky-700 rounded text-white"
              // onClick={handleSubmit}
            >
              Create
            </button>
            <button 
              className="p-2 bg-red-500 hover:bg-red-700 rounded text-white"
              type="button"
              onClick={close}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
};

export default DebtModalFormEdit;
