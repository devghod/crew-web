import { useEffect, useMemo, memo, useState } from 'react';
import { useInventoryStore } from '../../stores/inventoryStore';
import InventoryTableRow from './InventoryTableRow';
import InventoryTableHeader from './InventoryTableHeader';
import { useAuthStore } from '../../stores/authStore';

const InventoryTable = () => {
  const { 
    inventory, 
    inventories, 
    getInventories, 
    getInventory, 
    setInventoryClear,
    isLoading,
    isLoadingInventory
  } = useInventoryStore();
  const [ filterBy, setFilterBy ] = useState<string | null>(null);
  const [ order, setOrder ] = useState('asc'); // asc or desc
  const [ isOpenUpdateQuantity, setIsOpenUpdateQuantity ] = useState<boolean>(false);
  const [ inventoryId, setInventoryId ] = useState<string | undefined>();

  useEffect(() => { getInventories() }, []);

  useEffect(() => {
    if (!inventoryId) {
      setInventoryClear();
      return;
    };

    getInventory(inventoryId);
  }, [inventoryId, getInventory]);

  useEffect(() => {
    if (Object.keys(inventory).length === 0) return;
    if (Object.keys(inventory).length > 0) {
      setIsOpenUpdateQuantity(true);
    };
  }, [inventory]);

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
      };

      return order == 'asc' ? 
        valueA.toLocaleLowerCase().localeCompare(valueB.toLocaleLowerCase()) : 
        valueB.toLocaleLowerCase().localeCompare(valueA.toLocaleLowerCase());
    });
  }, [inventories, filterBy, order]);

  function setFilter(filter: string) {
    setOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    setFilterBy(filter);
  };

  function setUpdateQuantityFormId(inventoryId: string) {
    setInventoryId(inventoryId);
  };

  return (
    <>
      {isLoading && <TableLoader />}
      {!isLoading && (
        <div className='overflow-hidden rounded-lg shadow'>
          <table className='w-full table-fixed rounded-t-lg'>
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
                  <InventoryTableRow 
                    key={index} 
                    data={data} 
                    handleOpenUpdateQuantity={setUpdateQuantityFormId}
                  />
                ))
              }
            </tbody>
          </table>
        </div>
      )}
      {(isOpenUpdateQuantity && !isLoadingInventory) && (
        <UpdateQuantityForm 
          inventory={inventory} 
          quantityFormClose={() => setIsOpenUpdateQuantity(false)}
        />
      )}
    </>
  );
};

export default InventoryTable;

const UpdateQuantityForm = ({
  inventory,
  quantityFormClose
} : {
  inventory: any,
  quantityFormClose: () => void 
}) => {
  const loginUser: any = useAuthStore((state) => state.profile);
  const updateQuantity = useInventoryStore((state) => state.putInventoryQuantity);
  const isLoadingInventory = useInventoryStore((state) => state.isLoadingInventory);
  const [ formData, setFormData ] = useState({ 
    user_id: loginUser._id, 
    quantity: inventory.inventory_product_availability | 0
  });

  useEffect(() => {
    setFormData({
      user_id: loginUser._id,
      quantity: inventory.inventory_product_availability 
    });
  }, [loginUser, inventory]);

  function handleChange(event: any) {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  async function handleUpdateQuantity() {
    const form = {
      inventoryId: inventory._id,
      form: formData
    };

    await updateQuantity(form)
      .then(() => {
        quantityFormClose();
      });
  };

  return (
    <div className='relative z-20 transition ease-in-out duration-500'>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center h-screen">
        <div className="bg-white w-5/12 rounded-lg divide-y">
          <div className="py-2 px-3 font-semibold">
            Update Product Quantity
          </div>
          <div className="p-5 space-y-3">
            <div className="text-xs text-slate-500 cap">
              Positive number for increment and negative for decrement.
            </div>
            <div className="flex space-x-2">
              <div className="text-slate-500 text-sm font-medium">Product:</div>
              <div className="text-slate-800 text-sm font-medium">
                {inventory?.inventory_product_id?.product_name}
              </div>
            </div>
            <div className="flex space-x-2">
              <div className="text-slate-500 text-sm font-medium">Quantity:</div>
              <div className="text-slate-800 text-sm font-medium">
                <input 
                  id='quantity'
                  name='quantity'
                  className='border rounded py-1 px-2'
                  type='number' 
                  value={formData.quantity}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="py-2 px-3 text-right space-x-1">
            <button
              className='border border-gray-300 p-2 rounded-lg hover:bg-gray-300'
              onClick={quantityFormClose}
            >
              Cancel
            </button>
            <button
              className='border border-lime-300 p-2 rounded-lg bg-lime-500 hover:bg-lime-500/50'
              onClick={handleUpdateQuantity}
              disabled={isLoadingInventory}
            >
              {isLoadingInventory ? '...' : 'Update'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
};

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
