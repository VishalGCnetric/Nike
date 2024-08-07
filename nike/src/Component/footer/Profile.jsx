import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { EffectCoverflow, Pagination, Navigation } from 'swiper';

// Sample images for projects
const projects = [
  {
    id: 1,
    name: "Whiteland Urban Resort",
    location: "Sector 103, Gurgaon",
    price: "On Request",
    imageUrl: "https://media.istockphoto.com/id/479842074/photo/empty-road-at-building-exterior.jpg?s=612x612&w=0&k=20&c=SbyfZGN0i2O_QPLCdBcu9vhuzbQvTz4bGEn-lIzrN0E=",
  },
  {
    id: 2,
    name: "M3M Allitude",
    location: "Sector 65, Gurgaon",
    price: "On Request",
    imageUrl: "https://media.istockphoto.com/id/479842074/photo/empty-road-at-building-exterior.jpg?s=612x612&w=0&k=20&c=SbyfZGN0i2O_QPLCdBcu9vhuzbQvTz4bGEn-lIzrN0E=",
  },
  {
    id: 3,
    name: "M3M Mansion",
    location: "Sector 113, Gurgaon",
    price: "On Request",
    imageUrl: "https://media.istockphoto.com/id/479842074/photo/empty-road-at-building-exterior.jpg?s=612x612&w=0&k=20&c=SbyfZGN0i2O_QPLCdBcu9vhuzbQvTz4bGEn-lIzrN0E=",
  },
];

function TrendingProjectsCarousel() {
  return (
    <div className="relative w-full h-screen bg-black text-white overflow-hidden">
      {/* World map background */}
      <div className="absolute inset-0 bg-cover bg-center opacity-20 z-0" style={{backgroundImage: "url('path_to_world_map_image.jpg')"}}></div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center">
        {/* Trending Projects Heading */}
        <div className="text-center mb-12">
          <h2 className="font-cursive text-4xl md:text-5xl lg:text-6xl text-yellow-300 mb-2">Trending</h2>
          <h1 className="font-bold text-5xl md:text-6xl lg:text-7xl text-yellow-300 tracking-wide">Projects</h1>
        </div>

        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          }}
          pagination={{ el: '.swiper-pagination', clickable: true }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            clickable: true,
          }}
          modules={[EffectCoverflow, Pagination, Navigation]}
          className="swiper_container"
        >
          {projects.map((project) => (
            <SwiperSlide key={project.id}>
              <div className="relative flex flex-col bg-white bg-opacity-10 rounded-lg overflow-hidden shadow-lg text-white">
                <img
                  src={project.imageUrl}
                  alt={project.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold">{project.name}</h3>
                  <p className="text-xs md:text-sm">{project.location}</p>
                  <p className="text-xs md:text-sm">₹ {project.price}</p>
                  <button className="mt-4 py-2 px-4 bg-black text-white rounded-md transition-transform hover:scale-105">
                    View More
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}

          <div className="slider-controler">
            <div className="swiper-button-prev slider-arrow">
              <ion-icon name="arrow-back-outline"></ion-icon>
            </div>
            <div className="swiper-button-next slider-arrow">
              <ion-icon name="arrow-forward-outline"></ion-icon>
            </div>
            <div className="swiper-pagination"></div>
          </div>
        </Swiper>

        {/* More Projects Button */}
        <div className="mt-8">
          <button className="py-2 px-6 bg-yellow-300 text-black font-bold rounded-full transition-transform hover:scale-105">
            More Projects
          </button>
        </div>
      </div>
    </div>
  );
}

export default TrendingProjectsCarousel;
