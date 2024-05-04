import React from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import Loading from '../Pages/Loading';

export default function Products() {

    useEffect(() => {
        const fetchProducts = async () => {
          try {
            const response = await axios.get('http://localhost:1337/api/products');
            console.log(response.data.data);
          } catch (error) {
            // console.error('Error fetching products:', error);
            if(loading) return <Loading/>
           if(error) return <p>Network Error</p>
          }
        };
    
        fetchProducts();
      }, []);
  return (
    <div className='h-[900px]'>
      <h2>Prodct Details page</h2>
    </div>
  )
}
