import React, { useState, useEffect } from 'react';
import { logo, menu } from '../assets';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Navbar() {
    const [toggle, setToggle] = useState(true);
    const [user, setUser] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    const getPageName = () => {
        const path = location.pathname;
        if (path === '/') return 'Home';
        if (path === '/Images') return 'Images';
        if (path === '/Videos') return 'Videos';
        if (path === '/Product') return 'Product';
        if (path === '/about') return 'About';
        if (path === '/Login') return 'Login';
        if (path === '/Signup') return 'Sign Up';
        if (path === '/cart') return 'Cart';
        if (path.includes('/Products')) return 'Product Details';
        return '';
    };

    // Function to fetch user information
    const fetchUser = async () => {
        try {
            const token = localStorage.getItem('jwt');
            if (token) {
                const userResponse = await axios.get('https://six9foodzonee.onrender.com/api/users/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(userResponse.data);
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error('Failed to fetch user:', error);
            setUser(null);
        }
    };

    // Function to handle logout
    const handleLogout = () => {
        localStorage.removeItem('jwt');
        setUser(null);
        navigate('/Login');
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <div className='w-screen h-auto z-10 bg-white sticky drop-shadow-lg top-0 pt-2'>
            <div className='flex sticky justify-between items-center sm:top-0 w-full h-full md:max-w-[2040px]'>
                <div className='flex '>
                    <img src={logo} alt='logo' className='ss:ml-10 ml-5 w-full h-[50px] rounded-full mb-2' />
                </div>
                {/* Display current page name on small devices */}
                <div className='sm:hidden flex mx-auto'>
                    <h2 className='text-2xl font-bold mb-4 mx-auto shadow-xl'>{getPageName()}</h2>
                </div>

                <div className='flex item center'>
                    <ul className='hidden md:flex'>
                        <Link to="/" className='p-3 text-sm font-medium text-gray-900 cursor-pointer hover:bg-red-500 hover:rounded-2xl hover:text-white'>Home</Link>
                        <Link to="/Images" className='p-3 text-sm font-medium text-gray-900 cursor-pointer hover:bg-red-500 hover:rounded-2xl hover:text-white'>Images</Link>
                        <Link to="/Videos" className='p-3 text-sm font-medium text-gray-900 cursor-pointer hover:bg-red-500 hover:rounded-2xl hover:text-white'>Videos</Link>
                        <Link to="/Product" className='p-3 text-sm font-medium text-gray-900 cursor-pointer hover:bg-red-500 hover:rounded-2xl hover:text-white'>Product</Link>
                        <Link to="/about" className='p-3 text-sm font-medium text-gray-900 cursor-pointer hover:bg-red-500 hover:rounded-2xl hover:text-white'>About</Link>
                    </ul>
                </div>
                <div className='sm:hidden'>
                    <img src={menu} alt='menu' className='w-[20px] h-[20px] object-contain mr-5' onClick={() => setToggle(!toggle)} />
                </div>

                <div className='sm:flex sm:mr-10 md:mr-10 hidden'>
                    <Link to="/cart">
                        <img src='https://cdn.pixabay.com/photo/2014/06/19/00/59/shopping-cart-371980_1280.png' alt='cart' className='h-5 w-5 mt-1'/>
                    </Link>
                    {user ? (
                        <button onClick={handleLogout} className='border-none bg-blue-500 px-3 py-2 ml-4 text-sm font-medium text-white rounded'>Logout</button>
                    ) : (
                        <>
                            <Link to="/Login">
                                <button className='border-none bg-blue-500 px-3 py-2 ml-4 text-sm font-medium text-white rounded'>Login</button>
                            </Link>
                            <Link to="/Signup">
                                <button className='px-3 py-2 ml-4 bg-slate-300 text-sm font-medium text-gray-900 rounded'>Sign Up</button>
                            </Link>
                        </>
                    )}
                </div>
            </div>

            <ul className={!toggle ? 'absolute bg-slate-400 w-full px-8 pt-3 sm:hidden' : 'hidden'}>
                <li className='mb-3 h-fit text-center hover:bg-green-400 hover:rounded-md'>
                    <Link to="/" className='text-sm font-medium text-gray-900 cursor-pointer hover:text-white'>Home</Link>
                </li>
                <li className='mb-3 h-fit text-center hover:bg-green-400 hover:rounded-md'>
                    <Link to="/Images" className='p-3 text-sm font-medium text-gray-900 cursor-pointer hover:text-white h-fit'>Images</Link>
                </li>
                <li className='mb-3 h-fit text-center hover:bg-green-400 hover:rounded-md'>
                    <Link to="/Videos" className='p-3 text-sm font-medium text-gray-900 cursor-pointer hover:text-white'>Videos</Link>
                </li>
                <li className='mb-3 h-fit text-center hover:bg-green-400 hover:rounded-md'>
                    <Link to="/Product" className='p-3 text-sm font-medium text-gray-900 cursor-pointer hover:text-white'>Product</Link>
                </li>
                <li className='mb-3 h-fit text-center hover:bg-green-400 hover:rounded-md'>
                    <Link to="/about" className='p-3 text-sm font-medium text-gray-900 cursor-pointer hover:text-white'>About</Link>
                </li>
                <div className='flex flex-col my-4'>
                    {user ? (
                        <button onClick={handleLogout} className='bg-blue-200 rounded-md text-x font-medium text-gray-900 mb-4 py-3 px-8 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 w-full hover:bg-lime-300 hover:text-red-600'>Logout</button>
                    ) : (
                        <>
                            <Link to="/Login">
                                <button className='bg-blue-200 rounded-md text-x font-medium text-gray-900 mb-4 py-3 px-8 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 w-full hover:bg-lime-300 hover:text-red-600'>Login</button>
                            </Link>
                            <Link to="/Signup">
                                <button className='bg-transparent text-x font-medium text-gray-900 mb-4 py-3 px-8 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 w-full bg-white rounded-md hover:bg-sky-300 hover:text-white'>Sign Up</button>
                            </Link>
                        </>
                    )}
                </div>
            </ul>
        </div>
    );
}

export default Navbar;
