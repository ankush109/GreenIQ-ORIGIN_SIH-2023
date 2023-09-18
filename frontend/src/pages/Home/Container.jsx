import React from 'react'
import Demo from '../../assets/demo.jpg'

const Container = ({palette,text}) => {
  return (
    <div className={`primary-container flex flex-row flex-wrap items-center justify-between ${palette} ${text}`}>
                
                <div className='md:w-full lg:w-2/5 text-left my-5'>
                    <h1 className='md:text-5xl text-3xl font-merri'>Find your School Everywhere</h1>
                    <p className='leading-7 my-5 font-comf'>GreenIQ as a platform aims to provide users with seamless learning experience. Our goal is to make quality education and proper information accessible to one and all. Take a step forward to transform your educational journey with us.</p>
                    <button className='primary-btn'>GET STARTED</button>
                </div>
                <div className='lg:w-[500px] md:w-full   my-5'>
                    <img src={Demo} alt="demo video" className='rounded-lg '/>
                </div>
    </div>
  )
}

export default Container