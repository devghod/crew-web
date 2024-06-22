import React from "react";
import { Debt } from '../pages/debt/DebtTypes';
import StatusPill from '../../components/StatusPill';
import { dateFormat } from '../../utils/dateHelper';
import { currencyFormat } from '../../utils/currencyHelper';
import DebtTableLoader from './DebtTableLoader';

export type DebtTable = {
  debts: Debt[];
  isLoading: boolean;
  openDelete: (id: number) => void;
  openEdit: (id: number) => void;
  openStatus: (id: number) => void;
  openDetail: (id: number) => void;
};

const DebtTable: React.FC<DebtTable> = (props) => {

  const { debts, openDelete, openEdit, openStatus, openDetail, isLoading } = props;
  const [ debtList, setDebtList ] = React.useState([]);
  const [ menuOpen, setMenuOpen ] = React.useState({});

  React.useEffect(() => setDebtList(debts), [debts]);

  const onDelete = (event) => {
    const { value } = event.target;
    openDelete(value);
    setMenuOpen(false); 
  };

  const onEdit = (event) => {
    const { value } = event.target;
    openEdit(value);
    setMenuOpen(false); 
  };

  const onStatus = (event) => {
    const { value } = event.target;
    openStatus(value);
    setMenuOpen(false); 
  };

  const onDetail = (event) => {
    const { value } = event.target;
    openDetail(value);
    setMenuOpen(false); 
  };

  const handleMenuClick = (event) => {
    const { value } = event.target;
    setMenuOpen((prevMenuOpen) => ({...prevMenuOpen, [value]:!prevMenuOpen[value] }));
  };
  
  return (
    <div className="rounded container bg-white py-2 px-4">
      <div className="my-4">
        {isLoading && (<DebtTableLoader />)}
        {!isLoading && (
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
              {
                debts.length > 0 &&
                (<tbody>
                  {
                    debts.map((debtor: Debt, index: number) => (
                      <tr key={debtor._id} className="hover:bg-gray-100">
                        <td className="border-y border-slate-100 p-2">
                          <div className="font-medium text-sm tracking-wide">
                            {debtor.name}
                          </div>
                          <div className="text-xs text-slate-500">
                            {debtor._id}
                          </div>
                        </td>
                        <td className="border-y border-slate-100 p-2 text-sm">{currencyFormat(debtor.amount)}</td>
                        <td className="border-y border-slate-100 p-2 text-sm w-32">{debtor.method}</td>
                        <td className="border-y border-slate-100 p-2 text-sm w-32">{dateFormat(debtor.date_created, 'YYYY-MM-DD')}</td>
                        <td 
                          className={
                            `border-y border-slate-100 p-2 text-sm w-32 ${ifDateIsDue(debtor.due_date) ? "bg-red-500 text-white font-semibold" : ""}`
                          }
                        >
                          {dateFormat(debtor.due_date, 'YYYY-MM-DD')}
                        </td>
                        <td className="border-y border-slate-100 p-2 text-sm w-16">
                          {<StatusPill data={debtor.status} />}
                        </td>
                        <td className="border-y border-slate-100 p-2 text-sm space-x text-center w-16">
                          <div className="relative inline-block text-left">
                            <div>
                              <button 
                                type="button" 
                                className="inline-flex w-full justify-center gap-x-1.5 rounded-full bg-transparent px-3 py-2"
                                id={`menu-button-${index}`}
                                aria-expanded={menuOpen[index]? 'true' : 'false'}
                                aria-haspopup="true"
                                value={index}
                                onClick={handleMenuClick}
                              >
                                <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                  <title>dots-vertical</title>
                                  <path fillRule="evenodd" d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z" />
                                </svg>
                              </button>
                            </div>
                            <div 
                              className={ 
                                menuOpen[index] ? 
                                "absolute right-0 z-10 mt-2 w-24 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" : 
                                "hidden"
                              } 
                              role="menu" 
                              aria-orientation="vertical" 
                              aria-labelledby={`menu-button-${index}`}
                            >
                              <div className="py-1" role="none">
                                <button 
                                  className="w-full text-left py-2 text-slate-500 hover:bg-slate-100 px-2 rounded"
                                  value={debtor._id}
                                  onClick={onDetail}
                                >Details</button>
                                <button 
                                  className="w-full text-left py-2 text-slate-500 hover:bg-slate-100 px-2 rounded"
                                  value={debtor._id}
                                  onClick={onEdit}
                                >Edit</button>
                                <button 
                                  className="w-full text-left py-2 text-slate-500 hover:bg-slate-100 px-2 rounded"
                                  value={debtor._id}
                                  onClick={onStatus}
                                >
                                  {statusBtnTxt(debtor.status)}
                                </button>
                                <button 
                                  className="w-full text-left py-2 text-slate-500 hover:bg-slate-100 px-2 rounded"
                                  value={debtor._id}
                                  onClick={onDelete}
                                >Delete</button>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>)
              }
            </table>
          )
        }
        {(debts.length === 0 && !isLoading) && 
          (<div className="border-b border-x border-slate-100 p-2 text-center text-sm text-slate-400 font-semibold">No data</div>)
        }
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

const statusBtnTxt = (data: string) => (data.toLowerCase() === 'paid' ? 'Unpaid' : 'Paid');