import React from "react";
import DebtTable from "../../features/Debt/DebtTable";
import DebtController from "../../features/Debt/DebtController";
import DebtModalForm from "../../features/Debt/DebtModalForm";
import DebtModalDelete from "../../features/Debt/DebtModalDelete";
import DebtModalUpdateStatus from "../../features/Debt/DebtModalUpdateStatus";
import { debtors } from "./DebtInterface";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
        
export interface DebtCentralPage {};

const DebtCentralPage: React.FC<DebtCentralPage> = (props) => {

  const [ debts, setDebts ] = React.useState([]);
  const [ createModal, setCreateModal ] = React.useState(false);
  const [ deleteModal, setDeleteModal ] = React.useState(false);
  const [ editModal, setEditModal ] = React.useState(false);
  const [ statusModal, setStatusModal ] = React.useState(false);
  const [ id, setId ] = React.useState<null | number>(null);

  React.useEffect(() => setDebts([...debtors]), [debtors])

  const onCreateModal = () => {
    createModal ? 
      setCreateModal(false) : 
      setCreateModal(true);
  };

  const addDebt = (data: any) => {
    const dueDate = new Date(data.dueDate).toISOString().slice(0, 10); 
    const dateNow = new Date().toISOString().slice(0, 10); 
    setDebts([...debts, {
      id: debts.length + 1,
      name: data.name,
      amount: data.amount,
      due_date: dueDate,
      status: "Unpaid",
      date_requested: dateNow,
    }]);
    setCreateModal(false);
  };

  const onDeleteModal = (id: number) => {
    if (deleteModal) {
      setDeleteModal(false);
      setId(null);
    } else {
      setDeleteModal(true);
      setId(id);
    };    
  };

  const deleteDebt = () => {
    let temp = debts.filter((debt) => debt.id !== id);
    setDebts(temp);
    setDeleteModal(false);
  };

  const onStatusModal = (id: number) => {
    if (statusModal) {
      setStatusModal(false);
      setId(null);
    } else {
      setStatusModal(true);
      setId(id);
    };  
  };

  const updateStatus = () => {
    const index = debts.findIndex((debt) => debt.id === id);
    const tempStatus = debts[index].status === "Paid" ? "Unpaid" : "Paid";
    const updatedDebt = {...debts[index], status: tempStatus};
    const newDebts = [...debts];
    newDebts[index] = updatedDebt;
    setDebts(newDebts);
    setStatusModal(false);
  };

  const onEditModal = () => {
    editModal ? 
      setEditModal(false) : 
      setEditModal(true);
  };

  return (
    <div className="flex flex-col gap-y-4"> 
      <DebtController 
        open={onCreateModal}
      />
      <DebtTable 
        debts={debts}
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
      {
        statusModal && 
        (<DebtModalUpdateStatus
          close={onStatusModal}
          updateStatus={updateStatus}
          id={id}
        />)
      }
    </div>
  )
};

export default DebtCentralPage;