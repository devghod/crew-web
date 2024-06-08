import React from "react";
import DebtTable from "../../features/Debt/DebtTable";
import DebtController from "../../features/Debt/DebtController";
import DebtModalForm from "../../features/Debt/DebtModalForm";
import DebtModalDelete from "../../features/Debt/DebtModalDelete";
import { debtors } from "./DebtInterface";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
        
export interface DebtCentralPage {};

const DebtCentralPage: React.FC<DebtCentralPage> = (props) => {

  const [ createModal, setCreateModal ] = React.useState(false);
  const [ deleteModal, setDeleteModal ] = React.useState(false);
  const [ editModal, setEditModal ] = React.useState(false);
  const [ statusModal, setStatusModal ] = React.useState(false);
  const [ id, setId ] = React.useState(null);

  const onCreateModal = () => {
    createModal ? 
      setCreateModal(false) : 
      setCreateModal(true);
  };

  const onDeleteModal = (id: number) => {
    if (deleteModal) {
      setDeleteModal(false);
      setId(id);
    } else {
      setDeleteModal(true);
      setId(null);
    };    
  };

  const onEditModal = () => {
    editModal ? 
      setEditModal(false) : 
      setEditModal(true);
  };

  const onStatusModal = () => {
    statusModal ? 
      setStatusModal(false) : 
      setStatusModal(true);
  };
  
  const addDebt = (data: any) => {
    const dueDate = new Date(data.dueDate).toISOString().slice(0, 10); 
    const dateNow = new Date().toISOString().slice(0, 10); 
    debtors.push({
      id: debtors.length + 1,
      name: data.name,
      amount: data.amount,
      due_date: dueDate,
      status: "Unpaid",
      date_requested: dateNow,
    });
    setCreateModal(false);
  };

  const deleteDebt = () => {
    console.log(">", id)
    // debtors = debtors.filter((debt) => debt.id !== id);
  };

  return (
    <div className="flex flex-col gap-y-4"> 
      <DebtController 
        open={onCreateModal}
      />
      <DebtTable 
        debtors={debtors}
        openDelete={onDeleteModal}
        openEdit={onEditModal}
        openStatus={onStatusModal}
      />
      {
        createModal && 
        (<DebtModalForm
          addDebt={addDebt}
          close={onCreateModal}
        />)
      }
      {
        deleteModal && 
        (<DebtModalDelete
          close={onDeleteModal}
          deleteDebt={deleteDebt}
          id={id}
        />)
      }
    </div>
  )
};

export default DebtCentralPage;