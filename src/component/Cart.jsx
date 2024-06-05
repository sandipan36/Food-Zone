import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from '../Pages/Loading';

export default function UserCart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

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

  // Function to fetch cart items
  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem('jwt');
      if (token && user) {
        const response = await axios.get(`http://localhost:1337/api/carts?filters[userId]=${user.id}&populate=*`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCartItems(response.data.data);
      } else {
        setCartItems([]);
      }
    } catch (error) {
      setError('Failed to fetch cart items. Please try again later.');
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch product details
  const fetchProductDetails = async (productId) => {
    try {
      const response = await axios.get(`http://localhost:1337/api/products/${productId}?populate=*`);
      return response.data.data;
    } catch (error) {
      console.error(`Failed to fetch product details for product ID ${productId}:`, error);
      return null;
    }
  };

  useEffect(() => {
    // Fetch user information
    const fetchUserAndCartItems = async () => {
      await fetchUser();
    };
    fetchUserAndCartItems();
  }, []);

  useEffect(() => {
    // Fetch cart items when user is set
    if (user) {
      fetchCartItems();
    }
  }, [user]);

  useEffect(() => {
    // Fetch product details for each cart item
    const fetchAllProductDetails = async () => {
      const productsData = {};
      for (const cartItem of cartItems) {
        const productId = cartItem.attributes.ProductId;
        if (productId) {
          const productDetails = await fetchProductDetails(productId);
          if (productDetails) {
            productsData[productId] = productDetails;
          }
        }
      }
      setProducts(productsData);
    };
    if (cartItems.length > 0) {
      fetchAllProductDetails();
    }
  }, [cartItems]);

  // Calculate total price of all cart items
  const totalCartPrice = cartItems.reduce((total, cartItem) => {
    const productId = cartItem.attributes.ProductId;
    const product = products[productId];
    const quantity = cartItem.attributes.products;
    const totalPrice = product ? product.attributes.Price * quantity : 0;
    return total + totalPrice;
  }, 0);

  if (loading) return <Loading />;
  if (error) return <p className="text-red-500 text-center mt-4">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-2xl font-semibold mb-4">Your Cart</h3>
          {cartItems.length > 0 ? (
            cartItems.map(cartItem => {
              const productId = cartItem.attributes.ProductId;
              const product = products[productId];
              const quantity = cartItem.attributes.products;
              const totalPrice = product ? product.attributes.Price * quantity : 0;

              return product ? (
                <div key={cartItem.id} className="mb-4 bg-white p-4 rounded-lg shadow-md">
                  <h4 className="text-xl font-semibold mb-2">{product.attributes.Title}</h4>
                  <p className="text-gray-700 mb-2"><strong>Description:</strong> {product.attributes.desc}</p>
                  <p className="text-gray-700 mb-2"><strong>Price:</strong> ${product.attributes.Price}</p>
                  <p className="text-gray-700 mb-2"><strong>Quantity:</strong> {quantity}</p>
                  <p className="text-gray-700 mb-2"><strong>Total Price:</strong> ${totalPrice}</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {product.attributes.Images?.data?.map(image => (
                      <img
                        key={image.id}
                        src={`http://localhost:1337${image.attributes.url}`}
                        alt={`Product Image ${image.id}`}
                        className="w-full h-40 object-cover rounded-lg shadow-md"
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div key={cartItem.id} className="mb-4 bg-white p-4 rounded-lg shadow-md">
                  <p className="text-gray-700">Loading product details...</p>
                </div>
              );
            })
          ) : (
            <p className="text-gray-500">Your cart is empty.</p>
          )}
          {cartItems.length > 0 && (
            <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold mb-2">Total Cart Price</h4>
              <p className="text-gray-700"><strong>Total Price:</strong> ${totalCartPrice.toFixed(2)}</p>
            </div>
          )}
          <button
            onClick={() => navigate('/product')}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Back to Products
          </button>
        </div>
      </div>
    </div>
  );
}
