import React from "react";
import { Debt } from '../pages/debt/DebtInterface';
import StatusPill from '../../components/StatusPill';

export interface DebtTable {
  debtors: Debt[],
};

const DebtTable: React.FC<DebtTable> = ({ debtors }) => {
  
  return (
    <table className="w-full table-auto border-collapse border border-slate-100">
      <thead>
        <tr className="text-left">
          <th className="p-2">ID</th>
          <th className="p-2">Name</th>
          <th className="p-2">Amount</th>
          <th className="p-2">Requested</th>
          <th className="p-2">Due</th>
          <th className="p-2">Status</th>
          <th className="p-2"></th>
        </tr>
      </thead>
      <tbody>
        {
          debtors.map((debtor: Debt, index: number) => (
            <tr key={index}>
              <td className="border-y border-slate-100 p-2">{debtor.id}</td>
              <td className="border-y border-slate-100 p-2">{debtor.name}</td>
              <td className="border-y border-slate-100 p-2">{debtor.amount}</td>
              <td className="border-y border-slate-100 p-2">{debtor.date_requested}</td>
              <td className="border-y border-slate-100 p-2">{debtor.due_date}</td>
              <td className="border-y border-slate-100 p-2">
                {<StatusPill data={debtor.status} />}
              </td>
              <td className="border-y border-slate-100 p-2 space-x-2 text-center">
                <button className="text-orange-500 hover:text-orange-700 hover:bg-orange-100 text-white font-bold px-2 rounded">Edit</button>
                <button className="text-green-500 hover:text-green-700 hover:bg-green-100 text-white font-bold px-2 rounded">Paid</button>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
};

export default DebtTable;