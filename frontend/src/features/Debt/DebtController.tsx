import React from 'react'
import DebtStats from '../../components/Debt/DebtStats'

export type DebtController = {
  open: () => void
  debtStats: number
  isLoading: boolean
}

const DebtController: React.FC<DebtController> = props => {
  const { open, debtStats, isLoading } = props
  const [loading, setLoading] = React.useState(true)

  React.useMemo(() => {
    return debtStats
  }, [debtStats])

  const onOpen = () => {
    open()
  }

  return (
    <div className='rounded container bg-white py-2 px-4'>
      <div className='my-4 grid grid-cols-2'>
        <div className='grid grid-cols-4 gap-x-4'>
          {isLoading && <div className='bg-slate-200 rounded-full h-3'></div>}
          {!isLoading && (
            <button
              className='p-2 bg-sky-500 hover:bg-sky-700 rounded text-white flex gap-x-1 max-w-fit'
              onClick={onOpen}
            >
              <svg
                className='self-center h-5 w-5'
                fill='currentColor'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
              >
                <title>plus-circle</title>
                <path d='M17,13H13V17H11V13H7V11H11V7H13V11H17M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z' />
              </svg>
              Create
            </button>
          )}
        </div>
        <div className='self-center'>
          {isLoading && (
            <div className='grid grid-cols-3 gap-x-20 text-center animate-pulse'>
              <div className='bg-slate-200 rounded-full h-3'></div>
              <div className='bg-slate-200 rounded-full h-3'></div>
              <div className='bg-slate-200  rounded-full h-3'></div>
            </div>
          )}
          {!isLoading && <DebtStats debtStats={debtStats} />}
        </div>
      </div>
    </div>
  )
}

export default DebtController
