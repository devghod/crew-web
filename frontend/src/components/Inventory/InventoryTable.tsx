import { useEffect, useMemo, memo, useState } from 'react';
import { useInventoryStore } from '../../stores/inventoryStore';
import InventoryTableRow from './InventoryTableRow';
import InventoryTableHeader from './InventoryTableHeader';
import { useAuthStore } from '../../stores/authStore';

type TNotification = {
  type?: 'success' | 'error' | 'warning' | 'fail';
  duration?: number;
  message: string;
  isVisible: boolean;
  onClose: () => void;
};

const InventoryTable = () => {
  const { 
    inventory, 
    inventories, 
    getInventories, 
    getInventory, 
    setInventoryClear,
    isLoading,
    putInventoryQuantity
  } = useInventoryStore();
  const [ filterBy, setFilterBy ] = useState<string | null>(null);
  const [ order, setOrder ] = useState('asc'); // asc or desc
  const [ isOpenUpdateQuantity, setIsOpenUpdateQuantity ] = useState<boolean>(false);
  const [ isNotificationVisible, setIsNotificationVisible ] = useState(false);
  const [ notificationResult, setNotificationResult ] = useState<TNotification>({ isVisible: false, message: '', type: 'success', onClose: () => {}});
  const [ notificationType, setNotificationType ] = useState<'success' | 'error' | 'warning' | 'fail'>();
  const [ notificationMessage, setNotificationMessage ] = useState('');

  useEffect(() => { getInventories() }, []);

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
    if (!inventoryId) {
      setInventoryClear();
      return;
    };

    getInventory(inventoryId);
  };

  function clearForm() {
    setIsOpenUpdateQuantity(false);
    setInventoryClear();
  };

  async function handleUpdateQuantity(form: { inventoryId: string, form: any }) {
    await putInventoryQuantity(form)
      .then((result: any) => {
        console.log(result)
        if (result.success) {
          setNotificationType('success');
          setNotificationMessage(result.message);
          setIsNotificationVisible(true);
          clearForm();
        } else {
          setNotificationType('error');
          setNotificationMessage(result.message);
          setIsNotificationVisible(true);
        }
      });
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
      {(isOpenUpdateQuantity) && (
        <UpdateQuantityForm 
          inventory={inventory} 
          quantityFormClose={clearForm}
          handleUpdateQuantity={handleUpdateQuantity}
        />
      )}
      {(isNotificationVisible) && (
        <NotificationSlideTopRight 
          message={notificationResult.message}
          type={notificationResult.type}
          duration={3000}
          isVisible={isNotificationVisible}
          onClose={() => setIsNotificationVisible(false)}
        />
      )}
    </>
  );
};

export default InventoryTable;

const NotificationSlideTopRight = ({
  type = "success",
  duration = 3000,
  message,
  isVisible,
  onClose,
} : TNotification) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer); 
    }
  }, [isVisible, duration, onClose]);
console.log(type, message, isVisible)
  const typeColors: any = {
    success: 'green',
    error: 'red',
    info: 'blue',
    warning: 'yellow'
  };

  return (
    <div
      className={`fixed top-4 right-4 transform transition-all duration-500 ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      } px-6 py-3 rounded-lg shadow-lg bg-${typeColors[type]}-500`}
      style={{ zIndex: 9999 }}
    >
      <p>{message}</p>
    </div>

    // <div className="relative">
    //   <div
    //     className={`fixed top-4 right-4 transform transition-all duration-500 ${
    //       show ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
    //     } bg-${typeColors[type]}-500 text-white px-6 py-3 rounded-lg shadow-lg`}
    //     style={{ zIndex: 9999 }}
    //   >
    //     <p>{message}</p>
    //   </div>
    // </div>
  );
};

const UpdateQuantityForm = ({
  inventory,
  quantityFormClose,
  handleUpdateQuantity,
} : {
  inventory: any;
  quantityFormClose: () => void;
  handleUpdateQuantity: (form: { inventoryId: string, form: any }) => void;
}) => {
  const loginUser: any = useAuthStore((state) => state.profile);
  const isLoadingInventory = useInventoryStore((state) => state.isLoadingInventory);
  const [ formData, setFormData ] = useState({ 
    user_id: loginUser._id, 
    quantity: 0
  });

  useEffect(() => {
    setFormData({
      user_id: loginUser._id,
      quantity: 0 
    });
  }, [loginUser, inventory]);

  function handleChange(event: any) {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  async function onUpdateQuantity() {
    handleUpdateQuantity({
      inventoryId: inventory._id,
      form: formData
    });
  };

  return (
    <>
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
                <div className="text-slate-500 text-sm font-medium">Available:</div>
                <div className="text-slate-800 text-sm font-medium">
                  {inventory?.inventory_product_availability}
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
                disabled={isLoadingInventory}
              >
                Cancel
              </button>
              <button
                className='border border-lime-300 p-2 rounded-lg bg-lime-500 hover:bg-lime-500/50'
                onClick={onUpdateQuantity}
                disabled={isLoadingInventory}
              >
                {isLoadingInventory ? 'Updating...' : 'Update'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
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
