import React from "react";
import { Debt } from "../../pages/debt/DebtTypes";

export type DebtModalDetail = {
  close: () => void;
  debt: Debt;
  isLoading: boolean;
};

const DebtModalDetail: React.FC<DebtModalDetail> = (props) => {

  const { close, isLoading, debt } = props;
  
  return (
    <div className="bg-gray-900 bg-opacity-50 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-40 outline-none focus:outline-none">
      <div className="relative w-auto my-6 mx-auto max-w-3xl">
        <div className="w-5.6 bg-white rounded-lg flex flex-col divide-y">
          <div className="grid grid-cols-2">
            <h2 className="text-lg font-bold px-4 py-3">Details</h2>
            <div className="text-right self-center">
              <button 
                className="p-2 bg-transparent text-slate-500 hover:text-slate-700 rounded mx-2"
                type="button"
                onClick={close}
              >
                <svg className="-mr-1 h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <title>close</title>
                  <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4 p-4 text-slate-500">
            <div className="text-right grid gap-2 font-semibold">
              <div className="">Borrower</div>
              <div className="">ID</div>
              <div className="">Borrowed Amount </div>
              <div className="">Remaining Amount</div>
              <div className="">Date Requested</div>
              <div className="">Date Due</div>
              <div className="">Status</div>
              <div className="">Installment</div>
              <div className="">Method</div>
              <div className="">Interest Rate</div>
            </div>
            <div className="col-span-3 grid gap-2">
              <div className="">{debt.name}</div>
              <div className="">{debt.id}</div>
              <div className="">Php {debt.amount}</div>
              <div className="">Php {debt.amount_remaining}</div>
              <div className="">{debt.date_requested}</div>
              <div className="">{debt.due_date}</div>
              <div className="">{debt.status}</div>
              <div className="">{debt.installment}</div>
              <div className="">{debt.method}</div>
              <div className="">{debt.interest_rate}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default DebtModalDetail;
