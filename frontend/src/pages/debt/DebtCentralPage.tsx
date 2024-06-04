import React from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import DebtTable from "../../components/Debt/DebtTable";
import { debtors } from "./DebtInterface";
        
export interface DebtCentralPage {};

const DebtCentralPage: React.FC<DebtCentralPage> = (props) => {
  
  return (
    <div className="rounded container bg-white py-2 px-4">
      <div className="my-4">
        <DebtTable 
          debtors={debtors}
        />
      </div>
    </div>
  )
};

export default DebtCentralPage;