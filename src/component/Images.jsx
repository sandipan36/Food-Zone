
import { useState, useEffect } from 'react';
import axios from 'axios';
import { menu } from '../assets';

function CategoryModal({ categories, onClose }) {
  return (
    <div className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="text-center sm:text-left">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Categories</h3>
                <ul className="text-lg">
                  {categories.map((category, index) => (
                    <li key={index}>{category}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button onClick={onClose} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ImagesPage() {
  const [products, setProducts] = useState([]);
  const [news, setNews] = useState([]);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Sample categories
  const categories = ["Category 1", "Category 2", "Category 3", "Category 4"];

  const categori = ["Category 1", "Category 2", "Category 3"];

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('https://six9foodzonee.onrender.com/api/images?populate=*');
        setProducts(response.data.data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=a55cd877b40543bca820366ed66d2b81');
        setNews(response.data.articles); // Limit to 10 news items
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNewsIndex((prevIndex) => (prevIndex +1) % news.length);
    }, 3000); // Change news every 5 seconds

    return () => clearInterval(interval);
  }, [news]);

  return (
    <div className="container w-full
     h-auto flex flex-wrap">
     <div className="block ml-2 mt-2 fixed z-2">
        <button onClick={() => setIsMenuOpen(true)} className="text-2xl">
          <img src={menu}/>
        </button>
      </div>

      <div className="w-1/6 hidden lg:block mt-9 shadow-lg h-fit  ml-3 bg-purple-200 rounded ">
        <h2 className="text-xl font-bold mb-4 mt-4 text-center">Categories</h2>
        <ul className="text-lg">
          {categori.map((category, index) => (
            <li key={index} className='text-center text-red-400 hover:text-red-600 hover:bg-slate-400 cursor-pointer mx-auto'>{category}</li>
          ))}
        </ul>

        <h2 className="text-xl text-center font-bold mb-4">Services</h2>
        <ul className="text-lg">
          {categori.map((category, index) => (
            <li key={index} className='text-center text-red-400 hover:text-red-600 cursor-pointer mx-auto hover:bg-slate-400 '>{category}</li>
          ))}
        </ul>

        <h2 className="text-xl text-center font-bold mb-4">Menu</h2>
        <hr />
        <ul className="text-lg">
          {categori.map((category, index) => (
            <li key={index} className='text-center text-red-400 hover:text-red-600 cursor-pointer  mx-auto hover:bg-slate-400'>{category}</li>
          ))}
        </ul>
        <div>
          <p className='text-center bg-dimwhite mt-5 font-serif font-semibold '>
            OUR TOP OFFERS
          </p>
          <ul className="text-lg">
          {categori.map((category, index) => (
            <li key={index} className='text-center text-red-400 hover:text-red-600 cursor-pointer  mx-auto hover:bg-slate-400'>{category}</li>
          ))}
        </ul>
        </div>
      </div>
  
      {/* Modal for Categories (visible on small screens) */}
      {isMenuOpen && (
        <CategoryModal categories={categories} onClose={() => setIsMenuOpen(false)} />
      )}

      {/* Products Section */}
      <div className="w-full lg:w-1/2 ">
        <div className="flex flex-wrap ">
          {products.map((product, index) => (
            <div key={index} className="max-w-sm rounded-xl overflow-hidden shadow-lg my-4 lg:mr-4  mx-auto w-full">
              <img src={`https://six9foodzonee.onrender.com${product.attributes.image.data.attributes.url}`} alt={`Image ${index}`} className="w-full" />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{product.attributes.Username}</div>
                <p className="text-gray-700 text-base" >{product.attributes.Title}</p>
                <p>{product.attributes.review}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Latest News Section */}
      <div className="lg:w-1/4 mt-4 lg:mt-0 lg:order-last lg:fixed md:ml-[860px]  mb-3 h-auto bg-dimwhite md:mb-3">
        <h2 className="text-xl text-center font-mono text-red-300 hover:text-blue-700 font-bold mb-4 mt-4 z-9  stick top-0 bg-blue-200">Latest News</h2>
        <div className="overflow-hidden h-auto">
          <ul className="p-2 mt-1">
            {news.map((article, index) => (
              <li key={index} className={`transition-transform duration-200 ease-in transform ${index === currentNewsIndex ? 'translate-y-0' : 'translate-y-full'}`} style={{ display: index >= currentNewsIndex && index < currentNewsIndex + 1 ? 'block' : 'none' }}>
                <div className="max-w-sm rounded-lg overflow-hidden shadow-lg">
                  <a href={article.url} target="_blank" rel="noopener noreferrer" className="block hover:underline">
                    <img src={article.urlToImage} alt={`News ${index}`} className="w-full" />
                    <div className="px-6 py-4">
                      <div className="font-bold text-xl mb-2">{article.title}</div>
                      <hr></hr>
                      <p className="text-gray-700 mb-5 font-mono font-bold ">{article.description}</p>
                    </div>
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
