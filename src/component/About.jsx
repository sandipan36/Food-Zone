import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { logo, menu } from '../assets';

const About = () => {
  const [images, setImages] = useState([]);
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('http://localhost:1337/api/images?populate=*');
        setImages(response.data.data.map(item => item.attributes.image.data.attributes.url)); // Extracting image URLs
        setNews(response.data.data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="container mx-auto px-4">
      <div className="mt-8 relative">
        <div className='flex mx-auto'></div>
        <Slider {...settings}>
          {images.map((imageUrl, index) => (
            <div key={index}>
              <div className='grid w-100%'>
                <img
                  src={`http://localhost:1337${imageUrl}`}
                  alt={`Image ${index}`}
                  className="w-full h-[500px] object-cover rounded-xl"
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-900 hover:text-blue-600">Our Team</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {/* Render your team members' cards here */}
          <div className="bg-cyan-200 p-4 rounded-lg shadow-md mx-auto hover:bg-black hover:text-white text-xl ">
            Nike
          </div>
          <div className="bg-cyan-200 p-4 rounded-lg shadow-md mx-auto hover:bg-black hover:text-white text-xl">ADIDAS</div>
          <div className="bg-cyan-200 p-4 rounded-lg shadow-md mx-auto hover:bg-black hover:text-white text-xl">PUMA</div>
          <div className="bg-cyan-200 p-4 rounded-lg shadow-md mx-auto hover:bg-black hover:text-white text-xl">BOAT</div>
        </div>
      </div>
      <div>
        {news.map((value) => (
          <div className=" bg-dimwhite rounded shadow-lg p-4 mt-5" key={value.id}>
            <div className='flex'>
              <h2 className='text-blue-600/75 font-extrabold mr-2 text-lg '>User Name:</h2>
              <p className='text-lg'>{value.attributes.Username}</p>
            </div>
            <div className="p-4 bg-blue-200 rounded shadow-md hover:bg-black hover:text-white">
              <div className="mt-1 flex">
                <h2 className='text-sm subpixel-antialiased font-medium mr-2'>Comment:</h2>
                <p className='font-medium'>{value.attributes.Title}</p>
              </div>
              <div className="mt-1 flex">
                <h2 className='text-sm subpixel-antialiased font-medium mr-2'>Rating :</h2>
                <p className='font-medium'><img src="https://cdn.pixabay.com/photo/2012/04/01/19/28/rating-24185_1280.png" alt="nw" className='h-12 w-fit'/></p>
              </div>
              <div className="mt-1 flex">
                <h2 className='text-sm subpixel-antialiased font-medium mr-2'>Posted:</h2>
                <p className='font-medium'>{value.attributes.createdAt}</p>
              </div>
              <div className="mt-1 flex">
                <h2 className='text-sm subpixel-antialiased font-medium mr-2'>Review:</h2>
                <p className='font-medium'>{value.attributes.review}</p>
              </div>
            </div>  
          </div>
        ))}
      </div>
      <h2 className="text-2xl font-bold mb-4 text-center mt-4">Our Story</h2>
      <div className="mt-8 flex md:flex-none sm:flex-none"> 
        <p className="text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus at blandit metus. Integer efficitur
          vulputate massa, vel pharetra risus fermentum a. Phasellus at feugiat nisi, in blandit neque. Duis
          vestibulum, orci nec aliquam ultricies, justo orci faucibus purus, id posuere felis quam eget odio.
          Vestibulum laoreet urna nec augue scelerisque bibendum. Maecenas sit amet nunc volutpat, sollicitudin
          elit sed, rutrum magna. Ut vel turpis sit amet lectus tincidunt laoreet.
        </p>
      </div>
    </div>
  );
};

export default About;
