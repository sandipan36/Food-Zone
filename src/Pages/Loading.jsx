// LoadingPage.jsx

import React from 'react';
import { mm } from '../assets'; // Import your logo image

const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-white bg-opacity-50">
      <div className="w-24 h-24 mb-4 animate-spin">
        <img src={mm} alt="Logo" className="w-full h-full" />
      </div>
      <h1 className="text-lg text-blue-900 font-bold mb-2 animate-pulse">Loading...</h1>
      <span>Please Wait Sometime </span>
    </div>
  );
};

export default Loading;
