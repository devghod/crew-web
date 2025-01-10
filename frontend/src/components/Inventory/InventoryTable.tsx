import Table from "../Table/Table";

const headers = [
  { name: 'Product ID', key: 'product_id' },
  { name: 'Product Name', key: 'product_name' },
  { name: 'Available', key: 'availability' },
];

const datas = [
  { product_id:'001', product_name: 'Shampoo', availability: 5 },
  { product_id:'002', product_name: 'Towel', availability: 1 },
];

const InventoryTable = () => {
  return (
    <div>
      <Table 
        header={headers}
        data={datas}
        isLoading={false}
      />
    </div>
  )
}

export default InventoryTable;