import { memo, useEffect, useRef, useState } from 'react';
import { DotsIcon } from '../../utils/icons';

const InventoryTableRow = memo(({
  data,
  handleOpenUpdateQuantity,
} : {
  data: any;
  handleOpenUpdateQuantity: (id: string) => void
}) => {
  const [ isOpen, setIsOpen ] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  function handleClickOutside(event: MouseEvent) {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  return (
    <>
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
          <div ref={dropdownRef} className="">
            <button
              className='rounded-lg transition ease-in-out delay-150 hover:shadow hover:-translate-y-1 hover:scale-110 hover:bg-slate-200'
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <DotsIcon />
            </button>

            {isOpen && (
              <div
                className="absolute z-20 w-40 bg-white border border-gray-300 rounded shadow-md"
                onMouseLeave={() => setIsOpen(false)}
              >
                <button
                  onClick={() => handleOpenUpdateQuantity(data._id)}
                  className='w-full block px-4 py-2 text-gray-800 hover:bg-gray-200 text-right'
                >
                  Update Quantity
                </button>
                <button
                  className='w-full block px-4 py-2 text-gray-800 hover:bg-gray-200 text-right'
                >
                  Details
                </button>
              </div>
            )}
          </div>
        </td>
      </tr>
    </>
  );
});

export default InventoryTableRow;
