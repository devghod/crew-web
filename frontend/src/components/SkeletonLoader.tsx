import React from 'react'

export type SkeletonLoader = {}

const SkeletonLoader: React.FC<SkeletonLoader> = props => {
  return (
    <div className='border bg-white rounded-lg p-4 max-w-sm w-full mx-auto'>
      <div className='animate-pulse flex space-x-4'>
        <div className='flex-1 space-y-6 py-1'>
          <div className='space-y-3'>
            <div className='grid grid-cols-5 gap-4'>
              <div className='h-2 bg-slate-200 rounded col-span-4'></div>
              <div className='h-2 bg-slate-200 rounded col-span-1'></div>
            </div>
            <div className='grid grid-cols-5 gap-4'>
              <div className='h-2 bg-slate-200 rounded col-span-4'></div>
              <div className='h-2 bg-slate-200 rounded col-span-1'></div>
            </div>
            <div className='grid grid-cols-5 gap-4'>
              <div className='h-2 bg-slate-200 rounded col-span-4'></div>
              <div className='h-2 bg-slate-200 rounded col-span-1'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SkeletonLoader
