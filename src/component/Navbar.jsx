import React, {useState} from 'react';
import { logo, menu } from '../assets';
import { Link } from 'react-router-dom';
// import DropdownMenu from './Dropdown';
import About from './About';
import Videos from './Videos';
import Product from './Product';
import { Signup } from '../Pages';

function Navbar() {
    const [toggle,setToggle]=useState(true); 

  return (
    <div className=' w screen h -[150px] z-10 bg-white sticky drop-shadow-lg  top-0'>
       <div  className='flex sticky justify-between items-center sm: top-0  w-full h-full md:max-w-[2040px] '>
            <div className='flex items-center'>
                <img src={logo} alt='logo' className='sm:ml-10 ss:ml-10 sm: ml-2 w-full h-[50px]  rounded-full'/>
            </div>
            <div className='flex item center sm:'>
                <ul className=' hidden md:flex '>
                    <Link to="/" className=' p-3 text-sm font-medium text-gray-900 cursor-pointer'>Home</Link>
                    <Link to="/Images" className=' p-3 text-sm font-medium text-gray-900 cursor-pointer'>Images</Link>
                    <Link to="/Videos" className=' p-3 text-sm font-medium text-gray-900 cursor-pointer'>Videos</Link>
                    <Link to="/Product" className=' p-3 text-sm font-medium text-gray-900 cursor-pointer'>Product</Link>
                    <Link to="/about" className=' p-3 text-sm font-medium text-gray-900 cursor-pointer'>About</Link>
                </ul>
            </div>
            <div className='sm:hidden'>
                <img src={menu} alt='menu' className='w-[20px] h-[20px] object-contain mr-5' onClick={function hanldeclick(){
                    // alert("click done. ")
                    setToggle(!toggle)
                }}/>

            </div>
            {/* Search Icon Expand Search Bar. */}
                {/* <div className={!toogle?'hidden':'hidden'}>
                    <input type= 'text' placeholder='Secrch Here.' className='bg-blue'/>
                </div>
                <img src={menu}  alt="search icon" className='w-[20px] h-[20px] object-contain mr-5'onClick={function hanldeclick(){
                    // alert("Search Done")
                    setSearch(!toggle)
                }}/> */}

        {/* SignUp Login Button  */}
            <div className='sm:flex sm:mr-10 md:mr-10 sm: hidden'>
                <button className='border-none bg-blue px-3 py-2 ml-4  text-sm font-medium text-gray-900 rounded '>Login </button>
                <Link to="/Signup">
                <button  className='px-3 py-2 ml-4 bg-slate-300 text-sm font-medium text-gray-900 rounded '>Sign Up</button>
                </Link>
            </div>   
       </div>
        
       <ul className={!toggle?'absolute bg-white w-full px-8 sm:hidden':'hidden'}>
                     {/* < li className=' p-3 text-sm font-medium text-gray-900'>Home</li>
                    <li className=' p-3 text-sm font-medium text-gray-900cursor-pointer'>Images</li>
                    <li className=' p-3 text-sm font-medium text-gray-900 cursor-pointer'>Videos</li>
                    <li className=' p-3 text-sm font-medium text-gray-900 cursor-pointer'>Product</li>
                    <li className=' p-3 text-sm font-medium text-gray-900 cursor-pointer' >About</li> */}
                   <li> 
                        <Link to="/" className=' p-3 text-sm font-medium text-gray-900 cursor-pointer'>Home</Link>
                   </li>
                    <li>
                        <Link to="/Images" className=' p-3 text-sm font-medium text-gray-900 cursor-pointer'>Images</Link>
                    </li>
                    <li>
                        <Link to="/Videos" className=' p-3 text-sm font-medium text-gray-900 cursor-pointer'>Videos</Link>
                    </li>
                    <li>
                        <Link to="/Product" className=' p-3 text-sm font-medium text-gray-900 cursor-pointer'>Product</Link>
                    </li>
                    <li>
                    <Link to="/about" className=' p-3 text-sm font-medium text-gray-900 cursor-pointer'>About</Link>
                    </li>
                <div className='flex flex-col my-4'>
                     <button className='bg-transparent text-sm font-medium text-gray-900 mb-4 py-3 px-8 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>login </button>
                     <Link to="/Signup">
                        <button  className='bg-transparent text-sm font-medium text-gray-900 mb-4 py-3 px-8 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 '>Sign Up</button>
                    </Link>
                </div>
        </ul>
        
    </div>
  )
}

export default Navbar
