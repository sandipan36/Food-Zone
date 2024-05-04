import React from 'react'

const Scroll = () => {
  return (
    <div className='bg-blue-200'>
      <div className="max-w-md mx-auto bg-teal-600 rounded-xl shadow-md overflow-hidden md:max-w-2xl mb-2 mt-2 w-full">
  <div className="md:flex">
    <div className="md:shrink-0">
      <img className="h-48 w-full object-cover md:h-full md:w-48" src="https://cdn.pixabay.com/photo/2016/06/20/04/30/asian-man-1468032_1280.jpg" alt="Modern building architecture"/>
    </div>
    <div className="p-8">
      <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Company retreats</div>
      <a href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">Incredible accommodation for your team</a>
      <p className="mt-2 text-slate-500">Looking to take your team away on a retreat to enjoy awesome food and take in some sunshine? We have a list of places to do just that.</p>
    </div>
  </div>
</div>
    </div>
  )
}

export default Scroll
