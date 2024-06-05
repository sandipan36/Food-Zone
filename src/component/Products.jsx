import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from '../Pages/Loading';

export default function Products() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [user, setUser] = useState(null);

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

  // Function to fetch product details
  const fetchProduct = async () => {
    try {
      const response = await axios.get(`https://six9foodzonee.onrender.com/api/products/${id}?populate=*`);
      setProduct(response.data.data);
    } catch (error) {
      setError('Network Error');
    } finally {
      setLoading(false);
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
      // Fetch user information
      await fetchUser();

      // Use user's ID stored in state
      const userId = user ? user.id : null;
      const token = localStorage.getItem('jwt');

      // Check if user is authenticated
      if (userId && token) {
        const response = await axios.get(`https://six9foodzonee.onrender.com/carts?filters[userId]=${userId}&filters[ProductId]=${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const existingCartItem = response.data.data[0];

        // Update existing cart item or add new item
        if (existingCartItem) {
          await axios.put(
            `https://six9foodzonee.onrender.com/api/carts/${existingCartItem.id}`,
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
            'https://six9foodzonee.onrender.com/api/carts',
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

        // Alert and navigate
        alert('Product added to cart successfully!');
        navigate('/cart');
        return; // Exit function after adding product to cart
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
    // Fetch user information and product details when component mounts
    fetchUser();
    fetchProduct();
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <p className="text-red-500 text-center mt-4">{error}</p>;
  if (!product) return <p className="text-gray-500 text-center mt-4">No product found.</p>;

  const { Title, desc, Price, Available, No_product, Images } = product.attributes;

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-2xl font-semibold mb-4">{Title}</h3>
          <p className="text-gray-700 mb-4"><strong>Description:</strong> {desc}</p>
          <p className="text-gray-700 mb-4"><strong>Price:</strong> ${Price}</p>
          <p className="text-gray-700 mb-4"><strong>Available:</strong> {Available ? 'Yes' : 'No'}</p>
          <p className="text-gray-700 mb-4"><strong>Number of Products:</strong> {No_product}</p>
          {Images?.data?.length > 0 && (
            <div>
              <h4 className="text-xl font-semibold mb-2">Images:</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {Images.data.map(image => (
                  <img
                    key={image.id}
                    src={`https://six9foodzonee.onrender.com${image.attributes.url}`}
                    alt={`Product Image ${image.id}`}
                    className="w-full h-40 object-cover rounded-lg shadow-md"
                  />
                ))}
              </div>
            </div>
          )}
          <div className="mt-6">
            <div className="flex items-center">
              <button
                onClick={decrementQuantity}
                className="px-4 py-2 bg-gray-300 rounded-l-md"
              >
                -
              </button>
              <span className="px-4 py-2 bg-white border-t border-b">{quantity}</span>
              <button
                onClick={incrementQuantity}
                className="px-4 py-2 bg-gray-300 rounded-r-md"
              >
                +
              </button>
            </div>
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
  );
}
//  final 