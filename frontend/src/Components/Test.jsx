import React from 'react'
import Leftbar from './Leftbar'

import Navbar from './Navbar'
import Gettest from './Gettest'

const Test = () => {
  return (
//     <div >
//         {/* <Leftbar/> */}
//         <h1>Tests</h1>
// <Leftbar/>
// <Test1/>
//     </div>
 <>
      
     
      <div className="flex flex-col">
          <Leftbar />
       <div className='flex  justify-center font-bold text-4xl '>Tests</div>
       <div>
      <div className="fixed flex flex-col  right-0 w-[75%] my-2 flex-col mx-10 bg-blue-200 rounded-xl  ">
            <div className="flex justify-between p-4 mx-2">
          <div>All Tests</div>
          <div>Upcoming Tests</div>
          <div>Attempted Tests</div>
          <div>Unsolved Tests</div>
          <div>Subject</div>

        </div>
          </div>
        
       </div>
      </div>
    </> 

    
  )
}

export default Test