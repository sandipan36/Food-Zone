// import React from 'react'
// import { Link } from 'react-router-dom';


// const Product = ({products}) => {
  
  
//   return (
//     <div>
//         <div className='w-full h-[900px] bg-blue-100'>
//            <h2 className='text-large uppercase text-slate-500'>Hello Product</h2> 

//            <div>
//             {products.data.map((products)=>
//             <div>
//               <Link key={products.id} to={`/products/${products.id}`}>
//                 <div>
//                   <h2>{products.attributes.Title}</h2>
//                 </div>
//               </Link>
//             </div>
//             )}
//            </div>

//         </div>
//     </div>
//   )
// }

// export default Product



// ProductPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Product= () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://six9foodzonee.onrender.com/api/products');
        setProducts(response.data.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(product => (
          <Link to={`/products/${product.id}`} key={product.id}>
            <div className="bg-white rounded-lg shadow-md p-4 mb-5 h-[">
              <div className="mb-4">
                <img src={`http://localhost:1337${product.attributes.Images.data[0].attributes.url}`} alt={product.attributes.Images.data[0].attributes.caption} className="w-full h-60 mt-1 object-cover" />
              </div>
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold">{product.attributes.Title}</h2>
                <span className={`px-2 py-1 rounded ${product.attributes.Available ? 'bg-green-500' : 'bg-red-500'} text-white text-xs`}>{product.attributes.Available ? 'Available' : 'Out of Stock'}</span>
              </div>
              <p className="text-gray-700 mb-4">{product.attributes.desc}</p>
              <div>
                <p className="text-gray-700 font-medium">Price: ${product.attributes.Price}</p>
                <p className="text-gray-700">Number of Products: {product.attributes.No_product}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Product;
