import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from '../Pages/Loading';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Products() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [user, setUser] = useState(null);
  const [allProducts, setAllProducts] = useState([]);

  // Function to fetch user information
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('jwt');
      if (token) {
        const userResponse = await axios.get('http://localhost:1337/api/users/me', {
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

  // Function to fetch product details
  const fetchProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:1337/api/products/${id}?populate=*`);
      setProduct(response.data.data);
    } catch (error) {
      setError('Network Error');
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch all products
  const fetchAllProducts = async () => {
    try {
      const response = await axios.get('http://localhost:1337/api/products?populate=*');
      setAllProducts(response.data.data);
    } catch (error) {
      console.error('Failed to fetch all products:', error);
    }
  };

  // Increment quantity
  const incrementQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  // Decrement quantity
  const decrementQuantity = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  // Function to add product to cart
  const addToCart = async () => {
    try {
      await fetchUser();
      const userId = user ? user.id : null;
      const token = localStorage.getItem('jwt');

      if (userId && token) {
        const response = await axios.get(
          `http://localhost:1337/api/carts?filters[userId][$eq]=${userId}&filters[ProductId][$eq]=${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const existingCartItem = response.data.data[0];

        if (existingCartItem) {
          await axios.put(
            `http://localhost:1337/api/carts/${existingCartItem.id}`,
            {
              data: {
                products: Number(existingCartItem.attributes.products) + quantity,
              },
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        } else {
          await axios.post(
            'http://localhost:1337/api/carts',
            {
              data: {
                userId: userId.toString(),
                ProductId: id,
                products: quantity,
              },
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }

        alert('Product added to cart successfully!');
        navigate('/cart');
        return;
      } else {
        console.error('User ID or token not found. Please log in again.');
        setError('User ID or token not found. Please log in again.');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      setError('Failed to add product to cart. Please try again later.');
    }
  };

  useEffect(() => {
    fetchUser();
    fetchProduct();
    fetchAllProducts(); // Fetch all products when the component mounts
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <p className="text-red-500 text-center mt-4">{error}</p>;
  if (!product) return <p className="text-gray-500 text-center mt-4">No product found.</p>;

  const { Title, desc, Price, Available, No_product, Images } = product.attributes;

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  const allProductsSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Filter out the current product from the allProducts array
  const filteredProducts = allProducts.filter(prod => prod.id !== parseInt(id));

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-dimwhite rounded-lg shadow-lg p-6">
          <h3 className="text-2xl font-semibold mb-4 text-center text-red-500 bg-blue-300 shadow-lg rounded-xl hover:text-black">
            {Title}
          </h3>
          <hr />
          {Images?.data?.length > 0 && (
            <div>
              {Images.data.length > 1 ? (
                <Slider {...sliderSettings}>
                  {Images.data.map(image => (
                    <div key={image.id}>
                      <img
                        src={`http://localhost:1337${image.attributes.url}`}
                        alt={`Product Image ${image.id}`}
                        className="w-[400px] h-[400px] mx-auto object-cover rounded-lg shadow-md"
                      />
                    </div>
                  ))}
                </Slider>
              ) : (
                <div className="flex justify-center ">
                  {Images.data.map(image => (
                    <img
                      key={image.id}
                      src={`http://localhost:1337${image.attributes.url}`}
                      alt={`Product Image ${image.id}`}
                      className="w-[400px] h-[400px] object-cover rounded-lg mx-auto shadow-md"
                    />
                  ))}
                </div>
              )}
            </div>
          )}
          <div className="w-[500px] mx-auto mt-8 hover:bg-slate-300 pr-2 pl-3 pb-3 pt-3 rounded-md bg-green-300 shadow-md ">
  <div className="flex flex-wrap justify-between mt-3">
    <p className="text-gray-700 mb-4 w-full sm:w-auto">
      <strong>Description:</strong> {desc}
    </p>
    <span className={`px-2 py-1 ml-3 rounded ${Available ? 'bg-green-500' : 'bg-red-500'} text-white text-x mt-3 sm:mt-0 hover:text-black hover:bg-blue-200 hover:shadow-lg hover:border-spacing-1`}>
      {Available ? 'Available' : 'Out of Stock'}
    </span>
  </div>
  <div className='flex flex-wrap justify-between mt-5'>
    <p className="text-red-400 mb-4 font-semibold w-full sm:w-auto">
      <strong className="text-gray-700">Price:</strong> ${Price}
    </p>
    <p className="text-gray-700 mb-4 ml-4 font-semibold w-full sm:w-auto">
      <strong className='text-red-400'>In Stock:</strong> {No_product}
    </p>
  </div>
  <div className="mt-6 flex flex-wrap justify-between items-center">
    <div className="flex flex-wrap items-center mb-4 sm:mb-0">
      <button
        onClick={decrementQuantity}
        className="px-4 py-2 bg-gray-300 rounded-l-md hover:bg-black hover:text-white"
      >
        -
      </button>
      <span className="px-4 py-2 bg-white border-t border-b">{quantity}</span>
      <button
        onClick={incrementQuantity}
        className="px-4 py-2 bg-gray-300 rounded-r-md hover:bg-black hover:text-white"
      >
        +
      </button>
    </div>
    <button
      onClick={addToCart}
      className="px-4 py-2 bg-blue-500 text-white rounded-md  sm:flex-wrap"
    >
      Add to Cart
    </button>
  </div>
</div>

        </div>
        <div className="mt-12">
          <h4 className="text-xl font-bold text-red-500 underline hover:no-underline mb-4 text-center " >Other Products</h4>
          {filteredProducts.length > 0 ? (
            <Slider {...allProductsSliderSettings}>
              {filteredProducts.map(product => (
                <div key={product.id} className="p-2">
                  <div className="bg-white rounded-lg shadow-lg p-4">
                    {product.attributes.Images?.data?.length > 0 && (
                      <img
                        src={`http://localhost:1337${product.attributes.Images.data[0].attributes.url}`}
                        alt={`Product Image ${product.id}`}
                        className="w-full h-40 object-cover rounded-md"
                      />
                    )}
                    <div className='flex justify-between'>
                      <div>
                        <h5 className="text-lg font-semibold mt-2">{product.attributes.Title}</h5>
                        <p className="text-gray-700">{product.attributes.desc}</p>
                        <p className="text-red-400 font-semibold">${product.attributes.Price}</p>
                      </div>
                      <div>
                        <button
                          onClick={addToCart}
                          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          ) : (
            <p className="text-gray-500 text-center">No other products found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
