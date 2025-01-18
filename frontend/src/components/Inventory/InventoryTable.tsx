import { useEffect, useMemo, memo, useState } from 'react';
import { useInventoryStore } from '../../stores/inventoryStore';
import InventoryTableRow from './InventoryTableRow';
import InventoryTableHeader from './InventoryTableHeader';

const InventoryTable = () => {
  const { inventories, getInventories, isLoading } = useInventoryStore();
  const [ filterBy, setFilterBy ] = useState<string | null>(null);
  const [ order, setOrder ] = useState('asc'); // asc or desc

  useEffect(() => {
    function init() {
      getInventories();
    };

    init();
  }, []);

  const computedInventories = useMemo(() => {
    if (!filterBy) { 
      return inventories.sort((a: any, b: any) => 
        a.product_name.toLocaleLowerCase()
          .localeCompare(b.product_name.toLocaleLowerCase())
        );
    };

    return inventories.sort((a: any, b: any) => {
      const valueA = a[filterBy];
      const valueB = b[filterBy];

      if (valueA == null || valueB == null) return 0;
      
      if (typeof valueA === "number" && typeof valueB === "number") {
        return order == 'asc' ? valueA - valueB : valueB - valueA;
      }

      return order == 'asc' ? 
        valueA.toLocaleLowerCase().localeCompare(valueB.toLocaleLowerCase()) : 
        valueB.toLocaleLowerCase().localeCompare(valueA.toLocaleLowerCase());
    });
  }, [inventories, filterBy, order]);

  function setFilter(filter: string) {
    setOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    setFilterBy(filter);
  };

  return (
    <>
      {isLoading && <TableLoader />}
      {!isLoading && (
        <table className='w-full table-auto rounded'>
          <InventoryTableHeader 
            filterData={setFilter}
          />
          <tbody className='rounded'>
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
  );
};

export default InventoryTable;

const TableLoader = memo(() => (
  <table className='w-full table-auto rounded border dark:border-gray-600 animate-pulse bg-white'>
    <thead className='border dark:border-gray-600'>
      <tr className='grid grid-cols-4 gap-x-2 border-b-2 dark:border-gray-600 bg-gray-200 dark:bg-gray-400'>
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
