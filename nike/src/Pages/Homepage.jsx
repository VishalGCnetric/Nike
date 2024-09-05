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
      <div className="container mx-auto px-12 py-8">
      <h2 className="text-3xl font-bold mb-6">The Latest</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {/* Card 1 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
          <img
            src="https://placehold.co/400x300"
            alt="Nike Zenvy Collection"
            className="w-full h-56 object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">Nike Zenvy Collection</h3>
            <a href="#" className="text-primary hover:underline">
              Shop Now
            </a>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
          <img
            src="https://placehold.co/400x300"
            alt="Kylian Mbappé Mercurial"
            className="w-full h-56 object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">Kylian Mbappé Mercurial</h3>
            <a href="#" className="text-primary hover:underline">
              Shop Now
            </a>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
          <img
            src="https://placehold.co/400x300"
            alt="Train Like LeBron in the TR1"
            className="w-full h-56 object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">Train Like LeBron in the TR1</h3>
            <a href="#" className="text-primary hover:underline">
              Shop Now
            </a>
          </div>
        </div>
      </div>
    </div>
    </div>

  )
}

export default Homepage