import React from "react";
import DebtTable from "../../features/Debt/DebtTable";
import DebtController from "../../features/Debt/DebtController";
import DebtModalForm from "../../features/Debt/DebtModalForm";
import DebtModalFormEdit from "../../features/Debt/DebtModalFormEdit";
import DebtModalDelete from "../../features/Debt/DebtModalDelete";
import DebtModalUpdateStatus from "../../features/Debt/DebtModalUpdateStatus";
import DebtModalDetail from "../../features/Debt/DebtModalDetail";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useDebtStore } from "./DebtState";
import { Debt } from "./DebtTypes";
        
export type DebtCentralPage = {};

const DebtCentralPage: React.FC<DebtCentralPage> = (props) => {

  const { 
    debts, 
    debtTotal, 
    isLoading,
    getDebts,
    deleteDebt, 
    updateDebt,
    updateStatusDebt,
    newDebt 
  } = useDebtStore();
  const [ createModal, setCreateModal ] = React.useState(false);
  const [ deleteModal, setDeleteModal ] = React.useState(false);
  const [ editModal, setEditModal ] = React.useState(false);
  const [ statusModal, setStatusModal ] = React.useState(false);
  const [ detailModal, setDetailModal ] = React.useState(false);
  const [ id, setId ] = React.useState<null | number>(null);
  const [ debt, setDebt ] = React.useState<null | Debt>(null);

  React.useEffect(() => {
    getDebts();
  }, []);

  React.useMemo(() => {
    return debts;
  }, [debts]);

  const onCreateModal = () => {
    createModal ? 
      setCreateModal(false) : 
      setCreateModal(true);
  };

  const addDebt = (data: any) => {
    const dueDate = new Date(data.due_date).toISOString().slice(0, 10); 
    const dateNow = new Date().toISOString().slice(0, 10); 
    
    newDebt({
      name: data.name,
      amount: data.amount,
      amount_remaining: data.amount,
      due_date: dueDate,
      installment: data.installment,
      interest_rate: data.interest_rate,
      method: data.method,
      status: "Unpaid",
      date_requested: dateNow,
    });
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

  const onDeleteDebt = () => {
    deleteDebt(id);
    setId(null);
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
    updateStatusDebt(id);
    setId(null);
    setStatusModal(false);
  };

  const onEditModal = async (id: number) => {
    if (editModal) {
      setEditModal(false);
      setId(null);
      setDebt(null);
    } else {
      const res = await getDebt(id);
      setDebt(res.data);
      setEditModal(true);
      setId(id);
    };  
  };

  const editDebt = (updatedData: Debt) => {
    updateDebt(updatedData);
    setEditModal(false);
  };

  const onDetailModal = async (id: number) => {
    if (detailModal) {
      setDetailModal(false);
      setDebt(null);
    } else {
      const res = await getDebt(id);
      setDebt(res.data);
      setDetailModal(true);
    };    
  };

  return (
    <div className="flex flex-col gap-y-4"> 
      <DebtController 
        open={onCreateModal}
        debtTotal={debtTotal}
      />
      <DebtTable 
        debts={debts}
        openDelete={onDeleteModal}
        openEdit={onEditModal}
        openStatus={onStatusModal}
        openDetail={onDetailModal}
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
          deleteDebt={onDeleteDebt}
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
      {
        editModal && 
        (<DebtModalFormEdit
          isLoading={isLoading}
          debt={debt}
          close={onEditModal}
          editDebt={editDebt}
        />)
      }
      {
        detailModal && 
        (<DebtModalDetail
          isLoading={isLoading}
          debt={debt}
          close={onDetailModal}
        />)
      }
    </div>
  )
};

export default DebtCentralPage;