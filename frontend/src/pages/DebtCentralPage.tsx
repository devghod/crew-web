import React from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
        
export interface DebtCentral {};

const DebtCentral: React.FC<DebtCentral> = (props) => {
  
  return (
    <div className="rounded container bg-white py-2 px-4">
      <div className="font-normal text-slate-600">Debt Central</div>
      <div className="">
        <table className="w-full table-auto border-collapse border border-slate-100">
          <thead>
            <tr className="text-left">
              <th className="p-2">ID</th>
              <th className="p-2">Name</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Requested</th>
              <th className="p-2">Due</th>
              <th className="p-2">Status</th>
              <th className="p-2">Action</th>
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
                  <td className="border-y border-slate-100 p-2">{debtor.status}</td>
                  <td className="border-y border-slate-100 p-2">
                    <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold">Edit</button>
                    <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold">Paid</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
};

export default DebtCentral;

export interface Debt {
  id: number;
  name: string;
  amount: number;
  date_requested: string;
  due_date: string;
  status: 'Paid' | 'Unpaid';
};

const debtors:Debt[] = [
  {
    id: 1,
    name: "Ben Mad",
    amount: 1000,
    date_requested: "2022-01-01",
    due_date: "2024-10-01",
    status: "Unpaid",
  },
  {
    id: 2,
    name: "Que Mad",
    amount: 2000,
    date_requested: "2022-01-01",
    due_date: "2024-10-01",
    status: "Unpaid",
  },
];