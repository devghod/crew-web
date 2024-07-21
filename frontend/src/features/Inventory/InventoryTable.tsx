import React from "react";

export type InventoryTable = {};

const InventoryTable: React.FC<InventoryTable> = (props) => {
  
  return (
    <div className="rounded container bg-white py-2 px-4">
      <div className="my-4">
        <table className="w-full table-auto border-collapse border border-slate-100">
          <thead>
            <tr className="text-left text-slate-500 text-sm">
              <th className="p-2">Name</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Method</th>
              <th className="p-2">Requested On</th>
              <th className="p-2">Due On</th>
              <th className="p-2">Status</th>
              <th className="p-2"></th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  )
};

export default InventoryTable;
