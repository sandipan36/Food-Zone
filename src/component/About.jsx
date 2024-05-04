// // http://localhost:1337/api/images


// import React, { useEffect, useState } from 'react';
// import axios from "axios";

// export default function About() {
// const[news,setNews]=useState([]);

//   useEffect(()=>{
//     axios.get("http://localhost:1337/api/images?populate=*")
//     .then((res)=>setNews(res.data.data));
    
//   },[]);

//   return (
//     <div className='w-full h-max bg-blue-100'>
//       <h2>hello</h2>
//       {news.map((value)=>{
//         return(
//           <div className='card' key={value.id}>
//             <h2>{value.attributes.Title}</h2>
//             <div>
//             {/* <img src={value.attributes.image.data.attributes.url} /> */}
//               <h3>{value.attributes.post}</h3>
//             </div>
//             </div>
//         )
//       })}
//     </div>
//   )
// }



// AboutPage.js


// AboutPage.js


// AboutPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const About = () => {
  const [images, setImages] = useState([]);
  const[news,setNews]=useState([]);
  
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
  };

  return (
    <div className="container mx-auto px-4">
      <div className="mt-8 relative">
        <div className='flex mx-auto'>
        <p className="text-3xl font-bold mb-4 mx-auto shadow-xl ">About Us</p>
        </div>
        <Slider {...settings}>
          {images.map((imageUrl, index) => (
            <div key={index}>
              <div className=' grid w-100% '>
              <img src={`http://localhost:1337${imageUrl}`} alt={`Image ${index}`} className="w-full h-[500px]" />
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <div className="mt-8 ">
        <h2 className="text-2xl font-bold mb-4">Our Team</h2>
        <div className="grid grid-cols-4 gap-4  ">
          {/* Render your team members' cards here */}
          <div className="bg-gray-200 p-4 rounded-[50px] shadow-md mx-auto">NIKE</div>
          <div className="bg-gray-200 p-4 rounded-[50px] shadow-md mx-auto">ADIDAS</div>
          <div className="bg-gray-200 p-4 rounded-[50px] shadow-md mx-auto">PUMA</div>
          <div className="bg-gray-200 p-4 rounded-[50px] shadow-md mx-auto ">BOAT</div>

        </div>

      </div>
      <div>
          {news.map ((value) =>{
        return(
          <div className=" bg-slate-200 rounded shadow-lg p-4 mt-5 " key={value.id}>
            <div className='flex'>
              <h2 className='text-blue-600/75 font-extrabold mr-2 text-lg'> user Name: </h2>
              <p className='text-lg'>{value.attributes.Username}</p>
            </div>
            <div className="p-4  bg-gray-200  rounded shadow-md">
              <div className="mt-1 flex">
              <h2 className='text-sm subpixel-antialiased font-medium mr-2'>Rating:</h2>
              <p className='font-medium'>{value.attributes.Title}</p>
              </div>
              <div className="mt-1 flex">
              <h2 className='text-sm subpixel-antialiased font-medium mr-2'>Posted :</h2>
              <p className='font-medium'>{value.attributes.createdAt}</p>
              </div>
              <div className="mt-1 flex">
              <h2 className='text-sm subpixel-antialiased font-medium mr-2'>Review:</h2>
              <p className='font-medium'>{value.attributes.review}</p>
              </div>
              </div>  
          </div>
        )
          })}
        </div>


      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Our Story</h2>
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