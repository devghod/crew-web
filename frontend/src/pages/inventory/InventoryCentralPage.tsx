import React from "react";
import InventoryTable from "../../features/Inventory/InventoryTable";
        
export type InventoryCentralPage = {};

const InventoryCentralPage: React.FC<InventoryCentralPage> = (props) => {

  return (
    <>
      <InventoryTable />
    </>
  )
};

export default InventoryCentralPage;