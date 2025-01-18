import { memo, useMemo } from 'react';
import TableRow from './TableRow';

type TTable = {
  header: any[];
  data: any[];
  isLoading: boolean;
  editData?: () => void;
  deleteData?: () => void;
};

const Table = (props: TTable) => {
  const { header, data, isLoading } = props;
  const filterHeaders = useMemo(() => header, [header]);
  const filterDatas = useMemo(() => data, [data]);

  return (
    <>
      {isLoading && <TableLoader />}
      {!isLoading && (
        <table className='w-full table-auto rounded'>
          <thead className=''>
            <tr className='leading-6 text-slate-900 dark:text-slate-700 text-xs border border-x-gray-200 border-b-gray-300 dark:border-b-gray-500 dark:border-gray-400 border-b-2 bg-gray-200 dark:bg-gray-400'>
              {filterHeaders.length > 0 &&
                filterHeaders.map((header, index) => (
                  <th className='p-2 w-1/5 text-left' key={index}>
                    {header.name}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody className=''>
            {filterDatas.length === 0 && (
              <tr className='border border-gray-200 text-slate-700 text-sm leading-6'>
                <td className='p-2 w-full text-center'>No data</td>
              </tr>
            )}
            {filterDatas.length > 0 &&
              filterDatas.map((data, index) => (
                <TableRow key={index} data={data} />
              ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default memo(Table);

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
