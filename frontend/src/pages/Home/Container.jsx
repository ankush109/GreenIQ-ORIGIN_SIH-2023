import React from 'react'
import Demo from '../../assets/demo.jpg'

const Container = ({palette,text}) => {
  return (
    <div className={`primary-container flex flex-row flex-wrap items-center justify-between ${palette} ${text}`}>
                
                <div className='md:w-full lg:w-2/5 text-left my-5'>
                    <h1 className='md:text-5xl text-3xl font-merri'>Keep the Tools You Love</h1>
                    <p className='leading-7 my-5 font-comf'>We’ve built our learning platforms to fit seamlessly with the tools you, your educators and learners love—no heartbreak or sacrifice. With hundreds of integration options, you can easily create a consistent digital learning experience.</p>
                    <button className='primary-btn'>GET STARTED</button>
                </div>
                <div className='lg:w-[500px] md:w-full   my-5'>
                    <img src={Demo} alt="demo video" className='rounded-lg '/>
                </div>
    </div>
  )
}

export default Container