export type StatusPill = {
  data?: 'paid' | 'active' | 'unpaid' | 'inactive' | 'default';
};

const StatusPill = (props: StatusPill) => {
  const { data } = props;
  const status = (data?.toLowerCase() ||
    'default') as keyof typeof objectStatusColor;

  const objectStatusColor = {
    paid: 'text-white bg-blue-500',
    active: 'text-blue-500 bg-blue-100 border border-1 border-blue-500 text-xs',
    unpaid: 'text-white bg-red-500',
    inactive: 'text-red-500 bg-red-100 border border-1 border-red-500 text-xs',
    default: 'text-black bg-gray-200',
  };

  return (
    <div
      className={`text-sm px-2 py-1 inline-block rounded-full ${objectStatusColor[status]}`}
    >
      {data}
    </div>
  );
};

export default StatusPill;
