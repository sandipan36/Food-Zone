import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Important for accessibility

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState(null); // State to store user information
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    // Check if user is already authenticated
    const token = localStorage.getItem('jwt');
    if (token) {
      fetchUser(token);
    }
  }, []);

  const fetchUser = async (token) => {
    try {
      const response = await axios.get('http://localhost:1337/api/users/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data.username);
      localStorage.setItem('userId', response.data.id); // Store user ID in local storage
    } catch (error) {
      console.error('Failed to fetch user:', error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:1337/api/auth/local', {
        identifier: username,
        password: password,
      });

      localStorage.setItem('jwt', response.data.jwt);
      fetchUser(response.data.jwt); // Fetch user information

      // Show success message
      setModalMessage('Login successful!');
      setModalIsOpen(true);
      
      // Redirect to home page after a delay
      setTimeout(() => {
        setModalIsOpen(false);
        window.location.href = '/';
      },1000); // 2 seconds delay
    } catch (error) {
      setModalMessage('Failed to log in. Please check your credentials.');
      setModalIsOpen(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt'); // Remove the JWT token
    localStorage.removeItem('userId'); // Remove the user ID
    localStorage.removeItem('cart'); // Remove the cart data
    setUser(null); // Reset the user state
  };

  return (
    <div>
      <div className='h-[500px] bg-slate-600 py-[90px] px-4 sm:px-6 lg:px-8'>
        <div className='bg-blue-400 w-fit mx-auto h-max  max-w-md  space-y-5  rounded-xl '>
          <h2 className='text-center font-mono text-2xl '>Sign in</h2>
          <p className='font-serif text-x ml-3 mr-3'>Welcome back!Please sign in to access your account </p>
          <form onSubmit={handleLogin}>
            <div className='flex mb-3'>
              <label className='text-center ml-3 mr-3 font-mono text-xl '>Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className='bg-blue-300 border-spacing-1 border-black mr-3 rounded-md'
              />
            </div>
            <div>
              <label className='text-center ml-3 mr-3 font-mono text-xl'>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='bg-blue-300 border-spacing-1 border-black mr-3 rounded-md'
              />
            </div>
            <button type="submit" className=' w-[200px] animate-pulse bg-green-600 rounded-lg mx-auto flex h-[32px] align-center mt-5 hover:animate-none font-serif text-xl '>
              <p className='ml-3'>Login</p>
              <img src='https://cdn.pixabay.com/photo/2012/04/11/10/24/arrow-27324_640.png' className='h-5 w-5 mt-1.5 ml-[110px]'/>
            </button>
            {error && <p>{error}</p>}
          </form>
          {/* {user && (
            <div>
              <p>Welcome, {user}!</p>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )} */}
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Login Modal"
        className="bg-white p-4 rounded-lg shadow-lg max-w-md mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2>{modalMessage}</h2>
        <button onClick={() => setModalIsOpen(false)} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
          Close
        </button>
      </Modal>
    </div>
  );
}

export default Login;
