import React from 'react'

const DashboardFooter: React.FC = () => {
  return (
    <div className='p-4 text-center text-xs border'>
      &copy; {new Date().getFullYear()} My Dashboard
    </div>
  )
}

export default DashboardFooter
