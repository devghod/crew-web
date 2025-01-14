import { useEffect, useMemo } from "react";
import Table from "../Table/Table";
import { useInventoryStore } from "../../stores/inventoryStore";

const headers = [
  { name: 'Product ID', key: 'inventory_product_id' },
  { name: 'Product Name', key: 'product_name' },
  { name: 'Brand', key: 'product_brand' },
  { name: 'Description', key: 'product_description' },
  { name: 'Available', key: 'inventory_product_availability' },
  { name: 'Price', key: 'product_price' },
];

const InventoryTable = () => {
  const { inventories, getInventories, isLoading } = useInventoryStore();

  useEffect(() => {
    function init() {
      getInventories();
    };

    init();
  }, []);

  const computedInventories = useMemo(() => inventories, [inventories]);

  return (
    <div>
      <Table 
        header={headers}
        data={computedInventories}
        isLoading={isLoading}
      />
    </div>
  )
}

export default InventoryTable;