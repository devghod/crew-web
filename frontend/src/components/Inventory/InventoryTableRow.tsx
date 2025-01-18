import { memo } from 'react';
import { DotsIcon } from '../../utils/icons';

export type TTableRow = {
  data: any;
};

const InventoryTableRow = memo((props: TTableRow) => {
  const { data } = props;

  return (
    <tr className='bg-gray-50 dark:bg-gray-200 border border-gray-200 dark:border-gray-300 text-slate-700 text-sm leading-6 hover:bg-gray-100'>
      <td className='p-2 text-right w-3/12'>
        {data.product_name}
      </td>
      <td className='p-2 text-right w-3/12'>
        {data.product_brand}
      </td>
      <td className='p-2 text-right w-1/6'>
        {data.inventory_product_availability}
      </td>
      <td className='p-2 text-right w-1/6'>
        PHP {data.product_price}
      </td>
      <td className='p-2 text-center'>
        <button
          className='rounded transition ease-in-out delay-150 hover:shadow hover:-translate-y-1 hover:scale-110 hover:bg-slate-200'
        >
          <DotsIcon />
        </button>
      </td>
    </tr>
  );
});

export default InventoryTableRow;
