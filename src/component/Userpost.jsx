import React from 'react'
import { Link } from 'react-router-dom'

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
                        <div className='bg-white rounded-xl overflow-hidden drop-shadow-md'>
                            {/* Api Implementation  */}
                            <span className='ml-2 py-2 text-gray-900'>{blogs.UserName}</span>
                            <img className=' h-[200px] w-full mx-auto rounded-xl' src={blogs.imgsrc} alt='User post image '/>
                            <div className='p-5'>
                                {/* Description Api Fetch  */}
                                <h2 className=' text-gray-900'>Description{blogs.desc}</h2>     
                                <text className='text-gray-600 text-xl '>{blogs.title}</text>
                            </div>
                        </div>
                   </Link>
                )}
            </div>
        </div>
        <div className=' mx-auto'>
        <p className='font-[899px] font-serif hover:font-extrabold '>OUR LATEST INVENTION</p>
        </div>
        
        <div className='flex mt'>
            <div>
                <p className='ml-3 font-extrabold text-black '>Lorem Iasdkhs dskbfs fkfsfka fsjhfkbf fhfshfakjhferie fdshgjfigf nsdfjefuewru dsf dsfhfskjhsdjhjfds jfoerowf dfhhfjie eiejjfghiidnjdfbvjiefn</p>
                <button className='bg-blue-900 text-red-500 py-2 mr-5 ml-5 mt-3 font-extrabold rounded-2xl hover:bg-slate-400 drop-shadow-2xl'>Subscribe Now!!!</button>
            </div>
            <img src="https://cdn.pixabay.com/photo/2016/03/27/19/47/water-1283963_1280.jpg" alt="" className='h-[180px] mt-3 mr-4 rounded-lg drop-shadow-2xl' />
        </div>
    </div>
  )
}

export default Userpost
