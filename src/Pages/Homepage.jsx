import React from 'react';
import { Footer, Navbar, NewsBanner, Scroll, Userpost } from '../component';
import Blogcontent from './Blogcontent';
import { banner, logo } from '../assets';


const Homepage = () => {

  return (
    <div className="flex flex-col min-h-screen">
      <NewsBanner/>
      <div className="flex-grow ">
        <p className="font-bold text-blue-900 uppercase text-center text-2xl">latest</p>
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
