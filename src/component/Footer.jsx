import React from 'react'
import { Homepage } from '../Pages'
import { Link } from 'react-router-dom'
import About from "./About"
import Images from './Images'

const Footer = () => {
  return (
    <div className='w-full max-w-full bg-slate-500 text-gray-300 px-8 py-2 relative bottom-full  '>
      <div className='max-w-[1240px] mx-auto grid grid-cols-3  md:grid-cols-5 sm:grid-cols-2 border-b-2 border-gray-700 drop-shadow-lg py-8'>
        <div>
          <h5 className='font-bold uppercase py-2'>Menu</h5>
          <ol>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/Images">Images</Link>
            </li>
            <li>
              <Link to="/Product">Product</Link>
            </li>
          </ol>
        </div>
        <div>
          <h5 className='font-bold uppercase py-2'>Quick Licks </h5>
          <ol>
            <li>
              FaceBook
            </li>
            <li>
             Instagram
            </li>
            <li>
             Twitter
            </li>
            <li>
              YouTube
            </li>
          </ol>
        </div>
{/* Third Grid  */}
<div>
          <h5 className='font-bold uppercase py-2'>Quick  </h5>
          <ol>
            <li>
              FaceBook
            </li>
            <li>
             Instagram
            </li>
            <li>
             Twitter
            </li>
            <li>
              YouTube
            </li>
          </ol>
        </div>

        <div>
          <h5 className='font-bold uppercase py-2'>Quick Licks </h5>
          <ol>
            <li>
              FaceBook
            </li>
            <li>
             Instagram
            </li>
            <li>
             Twitter
            </li>
            <li>
              YouTube
            </li>
          </ol>
        </div>
      </div>
      <div className='flex justify-around'>
        <div className='flex '>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
         <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
          </svg>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/2048px-2021_Facebook_icon.svg.png" alt="facebook" className='w-[20px] h-[20px] ml-1'/>
            </div>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/2048px-2021_Facebook_icon.svg.png" alt="facebook" className='w-[20px] h-[20px] ml-1'/>  
              <h2>Sandipan Shome @ All rights are riserved</h2>  
          </div>

      </div>
  )
}

export default Footer

