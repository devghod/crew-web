import React from "react";
import { Debt } from '../pages/debt/DebtInterface';
import StatusPill from '../../components/StatusPill';

export interface DebtTable {
  debtors: Debt[],
  openDelete: (id: number) => void;
  openEdit: (id: number) => void;
  openStatus: (id: number) => void;
};

const DebtTable: React.FC<DebtTable> = (props) => {

  const { debtors, openDelete, openEdit, openStatus } = props;

  const onDelete = (id: number) => {
    openDelete(id);
  };

  const onEdit = () => {
    openEdit();
  };

  const onStatus = () => {
    openStatus();
  };
  
  return (
    <div className="rounded container bg-white py-2 px-4">
      <div className="my-4">
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
                  <td 
                    className={
                      `border-y border-slate-100 p-2 ${ifDateIsDue(debtor.due_date) ? "text-red-500" : ""}`
                    }
                  >{debtor.due_date}</td>
                  <td className="border-y border-slate-100 p-2">
                    {<StatusPill data={debtor.status} />}
                  </td>
                  <td className="border-y border-slate-100 p-2 text-sm space-x text-center">
                    <button 
                      className="text-orange-500 hover:text-orange-700 hover:bg-orange-100 text-white font-medium px-2 rounded"
                      onClick={onEdit}
                    >Edit</button>
                    <button 
                      className="text-green-500 hover:text-green-700 hover:bg-green-100 text-white font-medium px-2 rounded"
                      onClick={onStatus}
                    >Paid</button>
                    <button 
                      className="text-red-500 hover:text-red-700 hover:bg-red-100 text-white font-medium px-2 rounded"
                      onClick={() => onDelete(debtor.id)}
                    >Delete</button>
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

export default DebtTable;

const ifDateIsDue = (date: string) => {
  const dueDate = new Date(date).toISOString().slice(0, 10); 
  const dateNow = new Date().toISOString().slice(0, 10); 

  return dateNow >= dueDate ? true : false;
};