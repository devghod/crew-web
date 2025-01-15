import { useEffect, useMemo, memo } from "react";
import { useInventoryStore } from "../../stores/inventoryStore";
import InventoryTableRow from "./InventoryTableRow";

const headers = [
  { name: 'Product ID', key: 'inventory_product_id' },
  { name: 'Product Name', key: 'product_name' },
  { name: 'Brand', key: 'product_brand' },
  { name: 'Description', key: 'product_description' },
  { name: 'Available', key: 'inventory_product_availability' },
  { name: 'Price', key: 'product_price' },
  { name: 'Action', key: '' },
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
    <>
      {isLoading && (<TableLoader />)}
      {!isLoading && (
        <table className='w-full table-auto rounded'>
          <thead className=''>
            <tr className='leading-6 text-slate-900 dark:text-slate-700 text-xs border border-x-gray-200 border-b-gray-300 dark:border-b-gray-500 dark:border-gray-400 border-b-2 bg-gray-200 dark:bg-gray-400'>
              {headers.length > 0 &&
                headers.map((header, index) => (
                  <th className='p-2 w-1/5 text-left' key={index}>
                    {header.name}
                  </th>
                ))
              }
            </tr>
          </thead>
          <tbody className=''>
            {computedInventories.length === 0 && (
              <tr className='border border-gray-200 text-slate-700 text-sm leading-6'>
                <td className='p-2 w-full text-center'>No data</td>
              </tr>
            )}
            {computedInventories.length > 0 &&
              computedInventories.map((data, index) => (
                <InventoryTableRow key={index} data={data} />
              ))
            }
          </tbody>
        </table>
      )}
    </>
  )
}

export default InventoryTable;

const TableLoader = memo(() => (
  <table className='w-full table-auto rounded border dark:border-gray-600 animate-pulse'>
    <thead className='border dark:border-gray-600'>
      <tr className='grid grid-cols-4 gap-x-2 border-b-2 dark:border-gray-600'>
        <td className='mx-2 my-3 h-3 bg-slate-300 dark:bg-slate-600 rounded-lg'></td>
        <td className='mx-2 my-3 h-3 bg-slate-300 dark:bg-slate-600 rounded-lg'></td>
        <td className='mx-2 my-3 h-3 bg-slate-300 dark:bg-slate-600 rounded-lg'></td>
        <td className='mx-2 my-3 h-3 bg-slate-300 dark:bg-slate-600 rounded-lg'></td>
      </tr>
    </thead>
    <tbody>
      <tr className='grid grid-cols-1 my-1'>
        <td className='mx-2 my-3 h-3 bg-slate-300 dark:bg-slate-600 rounded-lg'></td>
        <td className='mx-2 my-3 h-3 bg-slate-300 dark:bg-slate-600 rounded-lg'></td>
        <td className='mx-2 my-3 h-3 bg-slate-300 dark:bg-slate-600 rounded-lg'></td>
        <td className='mx-2 my-3 h-3 bg-slate-300 dark:bg-slate-600 rounded-lg'></td>
      </tr>
    </tbody>
  </table>
));
