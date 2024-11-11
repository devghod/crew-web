import * as React from 'react';

const SuspenseLoader: React.FC = () => {
  return (
    <div
      role='status'
      className='absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2 text-3xl text-teal-500'
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='animate-spin-slow'
        width='1em'
        height='1em'
        viewBox='0 0 24 24'
      >
        <path
          fill='currentColor'
          d='M12 2a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0V3a1 1 0 0 0-1-1m9 9h-2a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2M6 12a1 1 0 0 0-1-1H3a1 1 0 0 0 0 2h2a1 1 0 0 0 1-1m.22-7a1 1 0 0 0-1.39 1.47l1.44 1.39a1 1 0 0 0 .73.28a1 1 0 0 0 .72-.31a1 1 0 0 0 0-1.41ZM17 8.14a1 1 0 0 0 .69-.28l1.44-1.39A1 1 0 0 0 17.78 5l-1.44 1.42a1 1 0 0 0 0 1.41a1 1 0 0 0 .66.31M12 18a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-2a1 1 0 0 0-1-1m5.73-1.86a1 1 0 0 0-1.39 1.44L17.78 19a1 1 0 0 0 .69.28a1 1 0 0 0 .72-.3a1 1 0 0 0 0-1.42Zm-11.46 0l-1.44 1.39a1 1 0 0 0 0 1.42a1 1 0 0 0 .72.3a1 1 0 0 0 .67-.25l1.44-1.39a1 1 0 0 0-1.39-1.44Z'
        />
      </svg>
      <span className='sr-only'>Loading...</span>
    </div>
  );
};

export default SuspenseLoader;
