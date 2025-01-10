import { memo } from 'react';

export type TTableRow = {
  data: any;
};

const TableRow = memo((props: TTableRow) => {
  const { data } = props;

  return (
    <tr className='bg-gray-50 dark:bg-gray-200 border border-gray-200 dark:border-gray-300 text-slate-700 text-sm leading-6 hover:bg-gray-100'>
      {Object.keys(data).length > 0 &&
        Object.keys(data).map((key, index) => (
          <td className='p-2 w-1/5 text-right' key={index}>{data[key]}</td>
        ))
      }
    </tr>
  );
});

export default TableRow;
