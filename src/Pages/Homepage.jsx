import React from 'react';
import { Footer, Navbar, Scroll, Userpost } from '../component';
import Blogcontent from './Blogcontent';
import { banner, logo } from '../assets';
// import '../styles.css'; // Import your Tailwind CSS file or stylesheets

const Homepage = () => {

  return (
    <div className="flex flex-col min-h-screen">
      {/* <Navbar /> */}
      <div>
        <div className="flex">
         <img src={banner} alt="banner" className="w-full" />
        </div>
      </div>
      <div className="flex-grow ">
        <p className="font-bold text-blue-900 uppercase text-center">latest</p>
        <div className='flex flex-col '>
          <Userpost />
        </div>
        <div>
          <Scroll/>
        </div>
      </div>
      
    </div>
  );
};

export default Homepage;
