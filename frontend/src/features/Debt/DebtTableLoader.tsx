import React from "react";

export type DebtTableLoader = {};

const DebtTableLoader: React.FC<DebtTableLoader> = (props) => {
  
  return (
    <table className="w-full table-auto border-collapse border border-slate-100">
      <thead className="animate-pulse">
        <tr className="">
          <th className="p-2">
            <div className="h-3 bg-slate-200 rounded-full"></div>
          </th>
        </tr>
      </thead>
      <tbody className="animate-pulse">
        <tr className="">
          <td className="p-2">
            <div className="h-3 bg-slate-200 rounded-full"></div>
          </td>
        </tr>
        <tr className="">
          <td className="p-2">
            <div className="h-3 bg-slate-200 rounded-full"></div>
          </td>
        </tr>
        <tr className="">
          <td className="p-2">
            <div className="h-3 bg-slate-200 rounded-full"></div>
          </td>
        </tr>
        <tr className="">
          <td className="p-2">
            <div className="h-3 bg-slate-200 rounded-full"></div>
          </td>
        </tr>
      </tbody>
    </table>
  )
};

export default DebtTableLoader;
