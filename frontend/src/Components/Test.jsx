import React from 'react'
import Leftbar from './Leftbar'
import Leftbar1 from './Leftbar1'
import Leftbar2 from './Leftbar2'
import Test1 from './Test1'
import Navbar from './Navbar'

const Test = () => {
  return (
//     <div >
//         {/* <Leftbar/> */}
//         <h1>Tests</h1>
// <Leftbar/>
// <Test1/>
//     </div>
 <>
      <Navbar />
     
      <div className="flex flex-col">
          <Leftbar />
       <div className='flex  justify-center font-bold text-4xl '>Tests</div>
       <div>
        <Test1/>
       </div>
      </div>
    </> 

    
  )
}

export default Test