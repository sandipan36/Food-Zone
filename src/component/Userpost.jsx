import React from 'react'
import { Link } from 'react-router-dom'
import { logo,menu,banner,loading,mm } from '../assets';
import CompanyLogos from './CompanyLogo';

const logos = [
    "https://cdn.pixabay.com/photo/2024/03/05/22/04/bird-8615360_640.jpg",
    "https://cdn.pixabay.com/photo/2024/03/05/22/04/bird-8615360_640.jpg",
    "https://cdn.pixabay.com/photo/2016/06/20/04/30/asian-man-1468032_1280.jpg",
    "https://cdn.pixabay.com/photo/2024/03/05/22/04/bird-8615360_640.jpg",
    "https://cdn.pixabay.com/photo/2016/06/20/04/30/asian-man-1468032_1280.jpg",
    "https://cdn.pixabay.com/photo/2024/03/05/22/04/bird-8615360_640.jpg",
    "https://cdn.pixabay.com/photo/2016/06/20/04/30/asian-man-1468032_1280.jpg","https://cdn.pixabay.com/photo/2024/03/05/22/04/bird-8615360_640.jpg",
    "https://cdn.pixabay.com/photo/2016/06/20/04/30/asian-man-1468032_1280.jpg",
    // Add more logo paths as needed
  ];

const Userpost = () => {

    const blogs=[
        {
            "id": 1,
            "username":"John Karlos",
            "title":'blog 1',
            "desc":"sddsadssssdbhbhjdbadsd djgdjgdas d dgdsgdkhdask asdg asu dasu " ,
            "imgsrc":"https://cdn.pixabay.com/photo/2024/03/05/22/04/bird-8615360_640.jpg"
        },
        {
            "id": 2,
            "username":"John Karlos",
            "title":'blog 1',
            "desc":"sddsadssssdbhbhjdbadsd djgdjgdas d dgdsgdkhdask asdg asu dasu " ,
            "imgsrc":"https://cdn.pixabay.com/photo/2024/03/05/22/04/bird-8615360_640.jpg"
        },
        {
            "id": 3,
            "username":"John Karlos",
            "title":'blog 1',
            "desc":"sddsadssssdbhbhjdbadsd djgdjgdas d dgdsgdkhdask asdg asu dasu " ,
            "imgsrc":"https://cdn.pixabay.com/photo/2024/03/05/22/04/bird-8615360_640.jpg"
        },
        {
            "id": 4,
            "title":'blog 1',
            "desc":"sddsadssssdbhbhjdbadsd djgdjgdas d dgdsgdkhdask asdg asu dasu " ,
            "imgsrc":"https://cdn.pixabay.com/photo/2024/03/05/22/04/bird-8615360_640.jpg"
        },
        {
            "id": 4,
            "title":'blog 1',
            "desc":"sddsadssssdbhbhjdbadsd djgdjgdas d dgdsgdkhdask asdg asu dasu " ,
            "imgsrc":"https://cdn.pixabay.com/photo/2024/03/05/22/04/bird-8615360_640.jpg"
        }
    ]

  return (
    <div className='w-full min-h-max bg-blue-100 py-[50px]'>
        <div className="max-w-[1240px] mx-auto">
            <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-3 px-3'>
                {blogs.map((blogs)=>    
                     <Link to={`/blog/${blogs.id}`}> 
                        <div className='bg-white rounded-xl overflow-hidden mt-1 drop-shadow-md transition ease-in-out delay-5  hover:-translate-y-1 hover:scale-103 hover:bg-slate-300 duration-10'>
                            {/* Api Implementation  */}
                            <span className='ml-2 py-2 text-gray-900'>{blogs.UserName}</span>
                            <img className=' h-[200px] w-full mx-auto rounded-xl' src={blogs.imgsrc} alt='User post image '/>
                            <div className='p-5'>
                                {/* Description Api Fetch  */}
                                <h2 className=' text-gray-900 hover:underline'>Description {blogs.desc}</h2>     
                                <text className='text-gray-600 text-xl hover:text-red-900  hover:font-bold hover:font-mono w-fit h-fit  '>{blogs.title}</text>
                            </div>
                        </div>
                   </Link>
                )}
            </div>
        </div>
        <div className=' flex'>
        <p className=' mx-auto mt-4  mb-5 text-[#3a4790e9] font-serif hover:font-extrabold '>OUR LATEST INVENTION </p>
        </div>
        
        <div className='flex mt'>
            <div className="mx-auto ml-3 w-fit">
                <p className='ml-3 mx-auto font-extrabold text-black '>We introduce a scrollDirection state variable to track the current scrolling direction (1 for right, -1 for left).
In the handleScroll function, we check if the scroll position reaches either end of the container. If it does, we change the scrolling direction accordingly.
We continuously scroll the container in the specified direction by incrementing or decrementing the scrollLeft property. Adjust the scroll speed as needed.
The container will now scroll continuously from left to right and vice versa, creating a looping effect. Adjust the scroll interval and behavior as needed.</p>
               
                <button className='mt-4 mx-5 rounded-lg px-5 py-2 transition ease-in-out delay-150 bg-red-600 hover:-translate-y-1 hover:scale-110 hover:bg-green-500 duration-300  '>Subscribe Now !!!</button>
            </div>
            <div>
            <img src="https://cdn.pixabay.com/photo/2016/03/27/19/47/water-1283963_1280.jpg" alt="" className='h-[180px] mt-3 md:"hidden" mr-4 rounded-lg drop-shadow-2xl' />
            <img src="https://cdn.pixabay.com/photo/2023/06/14/11/47/carnival-8062929_640.jpg" alt="" className='h-[180px] mt-3 md:"hidden" mr-4 rounded-lg drop-shadow-2xl' />
            </div>
            
        </div>
        <div className='w-full mt-4 sm:"w-full mt-4" '>
                <h1 className="text-2xl font-bold mb-4 text-center">Our Trusted Partners</h1>
                <CompanyLogos logos={logos}  />
        </div>

        
    </div>
  )
}

export default Userpost
