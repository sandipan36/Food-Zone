import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CompanyLogos from './CompanyLogo';

const logos = [
  // ... (Your logos array)
  "https://cdn.pixabay.com/photo/2023/06/14/11/47/carnival-8062929_640.jpg",
  "https://cdn.pixabay.com/photo/2023/06/14/11/47/carnival-8062929_640.jpg",
  "https://cdn.pixabay.com/photo/2023/06/14/11/47/carnival-8062929_640.jpg",
  "https://cdn.pixabay.com/photo/2023/06/14/11/47/carnival-8062929_640.jpg",
  "https://cdn.pixabay.com/photo/2023/06/14/11/47/carnival-8062929_640.jpg",
  "https://cdn.pixabay.com/photo/2023/06/14/11/47/carnival-8062929_640.jpg",
];

const Userpost = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Fetch blogs from the API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:1337/api/userposts?populate=*');
        const fetchedBlogs = response.data.data.map(blog => {
          const attributes = blog.attributes;
          const imgsrc = attributes.imgsrc.data?.[0]?.attributes?.url ?? ''; // Handle missing image
          const username = attributes.username ?? ''; // Handle missing username
          return {
            ...attributes,
            imgsrc,
            username,
            id: blog.id
          };
        });
        setBlogs(fetchedBlogs);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  // Check user authentication
  useEffect(() => {
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
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  // Handle form submission to post a new blog
  const handleBlogSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('jwt');
    if (!user) {
      setShowModal(true); // Show modal if user is not logged in
      return;
    }

    setIsSubmitting(true); // Start submitting

    const formData = new FormData();
    formData.append('data', JSON.stringify({
      title: event.target.title.value,
      desc: event.target.desc.value,
      username: user.username // Include the username in the blog post
    }));
    formData.append('files.imgsrc', event.target.imgsrc.files[0]); // Append the selected file with 'files.imgsrc'

    try {
      const response = await axios.post('http://localhost:1337/api/userposts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Blog post response:', response);
      window.location.reload(); // Refresh the page after successful submission
    } catch (error) {
      console.error('Error posting blog:', error);
      // Handle error appropriately
    } finally {
      setIsSubmitting(false); // Stop submitting
    }

    event.target.reset();
  };

  return (
    <div className='w-full min-h-max bg-blue-100 py-[50px]'>
      <div className="max-w-[1240px] mx-auto">
        {loading ? (
          <div>Loading...</div>
        ) : (
         <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 px-3 overflow-x-hidden mr-2'>
 {blogs.map((blog) => (
  <Link to={`/blog/${blog.id}`} key={blog.id}>
    <div className='bg-white rounded-xl overflow mt-1 shadow-md hover:shadow-xl transition duration-300'>
      <span className='ml-2 py-2 text-blue-900 font-bold'>UserName: {blog.username || 'Anonymous'}</span>
      {blog.imgsrc && (
        <div className='w-full'>
          <img className='h-[200px]  w-full rounded-t-xl' src={`http://localhost:1337${blog.imgsrc}`} alt='User post image' />
        </div>
      )}
      <div className='p-5 overflow-x-hidden'>
        <h2 className='text-gray-900 hover:underline font-semibold'>About:</h2>
        {blog.desc && (
          <>
            {blog.desc.length > 10 ? ( // Adjust the character length limit as needed
              <>
                <p className='text-gray-600 text-xl'>{`${blog.desc.substring(0, 5)}...`}</p>
                <Link to={`/blog/${blog.id}`} className='text-blue-500 hover:underline'>Read More</Link>
              </>
            ) : (
              <p className='text-gray-600 text-xl '>{blog.desc}</p>
            )}
          </>
        )}
        {!blog.desc && <p className='text-gray-600 text-xl'>No description available</p>}
        <p className='text-gray-600 text-xl hover:text-red-900 hover:font-bold hover:font-mono'>{blog.title || 'No title'}</p>
      </div>
    </div>
  </Link>
))}

</div>

        )}
      </div>
      <div className='flex'>
        <p className='mx-auto mt-4 mb-5 text-[#3a4790e9] font-serif hover:font-extrabold '>OUR LATEST INVENTION</p>
      </div>
      <div className='flex mt'>
        <div className="mx-auto ml-3 w-fit">
          <p className='ml-3 mx-auto font-extrabold text-black'>We introduce a scrollDirection state variable to track the current scrolling direction (1 for right, -1 for left).
          In the handleScroll function, we check if the scroll position reaches either end of the container. If it does, we change the scrolling direction accordingly.
          We continuously scroll the container in the specified direction by incrementing or decrementing the scrollLeft property. Adjust the scroll speed as needed.
          The container will now scroll continuously from left to right and vice versa, creating a looping effect. Adjust the scroll interval and behavior as needed.</p>
          <button className='mt-4 mx-5 rounded-lg px-5 py-2 transition ease-in-out delay-150 bg-red-600 hover:-translate-y-1 hover:scale-110 hover:bg-green-500 duration-300'>Subscribe Now !!!</button>
        </div>
        <div>
          <img src="https://cdn.pixabay.com/photo/2016/03/27/19/47/water-1283963_1280.jpg" alt="" className='h-[180px] mt-3 md:hidden mr-4 rounded-lg drop-shadow-2xl' />
          <img src="https://cdn.pixabay.com/photo/2023/06/14/11/47/carnival-8062929_640.jpg" alt="" className='h-[180px] mt-3 md:hidden mr-4 rounded-lg drop-shadow-2xl' />
        </div>
      </div>
      <div className='w-full mt-4 sm:w-full '>
        <h1 className="text-2xl font-bold mb-4 text-center">Our Trusted Partners</h1>
        <CompanyLogos logos={logos} />
      </div>
      
      {user && (
        <div className='w-full mt-4'>
          
          <form onSubmit={handleBlogSubmit} className='bg-slate-400 p-4 rounded-lg shadow-md max-w-[600px] mx-auto '>
          <h2 className="text-xl font-bold mb-4 text-center hover:font-mono ">Whats On  Your Mind </h2> 
            <div className='mb-4 flex'>
              <label htmlFor='title' className='block mr-2 mt-2 font-semibold '>Status:</label>
              <input type='text' id='title' name='title' required className='w-full p-2 border border-gray-300 rounded' />
            </div>
            <div className='mb-4 flex'>
              <label htmlFor='desc' className='block  mt-2 mr-2 font-semibold'>About:</label>
              <textarea id='desc' name='desc' required className='w-full p-2 border border-gray-300 rounded'></textarea>
            </div>
            <div className='mb-4 flex '>
              <label htmlFor='imgsrc' className='block  mt-2  mr-2 font-semibold '>Image:</label>
              <input type='file' id='imgsrc' name='imgsrc' required className='w-full p-2 border border-gray-300 rounded-xl bg-blue-400' />
            </div>
            <button type='submit' className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600'>
              {isSubmitting ? 'Posting...' : 'Post Blog'}
            </button>
          </form>
        </div>
      )}

      {showModal && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white p-4 rounded-lg'>
            <p>You need to be logged in to post a blog.</p>
            <button onClick={() => setShowModal(false)} className='mt-2 bg-blue-500 text-white py-2 px-4 rounded'>Close</button>
            <button onClick={() => navigate('/login')} className='mt-2 bg-green-500 text-white py-2 px-4 rounded'>Login</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Userpost;
// Final 