import React from 'react'
import Banner1 from '../Assests/homeAssests/banner1.png'
import Slider from '../Component/Slider'
import SlickSliderComponent from '../Component/Swiper'

const Homepage = () => {
  return (
    <div className="w-full ">
      <div className="pl-6 pr-6">
        <img
          src={Banner1}
          alt="Nike Electric Pack"
          className="w-full h-full object-cover"
        />
        <div className="flex flex-col items-center justify-center mt-4 bg-white text-center">
          <h3 className="text-sm text-gray-600 mb-2">Nike Electric Pack</h3>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4">WIN ON AIR</h1>
          <p className="text-gray-600 mb-6">Engineered for those who stand out.</p>
          <div className="flex space-x-4">
            <button className="bg-black text-white py-2 px-6 rounded-full hover:bg-gray-800">Experience Air</button>
            <button className="bg-black text-white py-2 px-6 rounded-full hover:bg-gray-800">Shop Air</button>
          </div>
        </div>
      </div>
      <div>
        <Slider />
      </div>
      <div>
        <SlickSliderComponent />
      </div>
    </div>

  )
}

export default Homepage