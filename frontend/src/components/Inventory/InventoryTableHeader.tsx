import { memo } from 'react';
import { UpDownIcon } from '../../utils/icons';

const InventoryTableHeader = memo((
  props: {
    filterData: (data: string) => void
  }
) => {
  const filterData = props.filterData;

  function handleFilterData(filter: string) {
    filterData(filter);
  };

  return (
    <thead className='rounded'>
      <tr className='leading-6 rounded text-slate-900 dark:text-slate-700 text-xs border border-x-gray-200 border-b-gray-300 dark:border-b-gray-500 dark:border-gray-400 border-b-2 bg-gray-50 dark:bg-gray-400'>
        <th className='p-2 text-left'>
          <div className='flex space-x-1'>
            <div className="">Product Name</div>
            <div className="">
              <button 
                onClick={() => handleFilterData('product_name')}
                className='rounded transition ease-in-out delay-150 hover:shadow hover:-translate-y-1 hover:scale-110'
              >
                <UpDownIcon />
              </button>
            </div>
          </div>
        </th>
        <th className='p-2 text-left'>
          <div className='flex space-x-1'>
            <div className="">Brand</div>
            <div className="">
              <button 
                onClick={() => handleFilterData('product_brand')}
                className='rounded transition ease-in-out delay-150 hover:shadow hover:-translate-y-1 hover:scale-110'
              >
                <UpDownIcon />
              </button>
            </div>
          </div>
        </th>
        <th className='p-2 text-left'>
          <div className='flex space-x-1'>
            <div className="">Availability</div>
            <div className="">
              <button 
                onClick={() => handleFilterData('inventory_product_availability')}
                className='rounded transition ease-in-out delay-150 hover:shadow hover:-translate-y-1 hover:scale-110'
              >
                <UpDownIcon />
              </button>
            </div>
          </div>
        </th>
        <th className='p-2 text-left'>
          <div className='flex space-x-1'>
            <div className="">Price</div>
            <div className="">
              <button 
                onClick={() => handleFilterData('product_price')}
                className='rounded transition ease-in-out delay-150 hover:shadow hover:-translate-y-1 hover:scale-110'
              >
                <UpDownIcon />
              </button>
            </div>
          </div>
        </th>
        <th className='p-2 text-left'></th>
      </tr>
    </thead>
  );
});

export default InventoryTableHeader;
