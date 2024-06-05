import { useState, useEffect } from 'react';
import { banner } from '../assets';

const NewsBanner = () => {
  const [newsIndex, setNewsIndex] = useState(0);
  const news = [
    " Important news about Mt. Westie: News 1",
    " Important news about Mt. Westie: News 2",
    " Important news about Mt. Westie: News 3",
    // Add more news items as needed
  ];

  useEffect(() => {
    // Rotate news items every 5 seconds
    const interval = setInterval(() => {
      setNewsIndex((prevIndex) => (prevIndex + 1) % news.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [news.length]);

  return (
    <div>
      <div className="flex">
        <img src="https://cdn.pixabay.com/photo/2024/04/29/10/20/gaming-8727501_1280.jpg" alt="banner" className="w-full h-[600px]" />
      </div>
      <div className="absolute top-20 left-1/4 transform -translate-x-1/2 -translate-y-1/3 text-center">
        {/* <img src="https://cdn.pixabay.com/photo/2024/04/29/10/20/gaming-8727501_1280.jpg" className='h-[100px] w-[90px] rounded-[50%] mx-auto'/> */}
        <p className="text-green-400 text-2xl cursor-pointer hover:underline hover:text-red-700"><span className='text-white'>*</span>{news[newsIndex]}</p>
      </div>
    </div>
  );
};

export default NewsBanner;
