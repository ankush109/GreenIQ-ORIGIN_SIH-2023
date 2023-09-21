import React from 'react'
import Leftbar from './Leftbar';
import { Outlet } from 'react-router-dom'


const Dashboard = () => {
  return (
    <div className='w-full flex flex-row justify-start  h-full'>
        <div className='w-1/5 '>
            <Leftbar />
        </div>
        <div className='w-4/5'>
          <Outlet/>
      </div>
    </div>
  )
}

export default Dashboard