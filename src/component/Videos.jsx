import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from '../Pages/Loading'; // Ensure this component is correctly imported

const Videos = () => {
  const [allVideos, setAllVideos] = useState([]);
  const [myVideos, setMyVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false); // New state for submission loading
  const [user, setUser] = useState(null); // State to store user information
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility
  const navigate = useNavigate();

  // Fetch user information to check if logged in
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('jwt'); // Corrected the token retrieval
        if (token) {
          const userResponse = await axios.get('http://localhost:1337/api/users/me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log('User data:', userResponse.data); // Debug: Log user data
          setUser(userResponse.data);
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };
    fetchUser();
  }, []);

  // Fetch all videos from the API
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('http://localhost:1337/api/vedios?populate=*');
        const videosData = response.data.data.map(video => ({
          id: video.id,
          title: video.attributes.Title,
          url: video.attributes.story.data[0]?.attributes.url, // Handle case where story data may not be available
          userId: video.attributes.userId, // Assuming there is a userId field
        }));
        setAllVideos(videosData);
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  // Fetch logged-in user's videos
  useEffect(() => {
    if (user) {
      const fetchMyVideos = async () => {
        try {
          const response = await axios.get(`http://localhost:1337/api/vedios?filters[userId][$eq]=${user.id}&populate=*`);
          const myVideosData = response.data.data.map(video => ({
            id: video.id,
            title: video.attributes.Title,
            url: video.attributes.story.data[0]?.attributes.url, // Handle case where story data may not be available
          }));
          setMyVideos(myVideosData);
        } catch (error) {
          console.error('Error fetching my videos:', error);
        }
      };
      fetchMyVideos();
    }
  }, [user]);

  // Handle form submission to post a new video to the API
  const handleVideoSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('jwt');
    if (!user) {
      setShowModal(true); // Show modal if user is not logged in
      return;
    }

    setSubmitting(true); // Set submitting state to true
    const title = event.target.title.value;
    const file = event.target.file.files[0];

    const formData = new FormData();
    const data = { Title: title, userId: user.id }; // Include userId in the data object
    formData.append('data', JSON.stringify(data));
    formData.append('files.story', file);

    // Debug: Log FormData content
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const response = await axios.post('http://localhost:1337/api/vedios', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`, // Include the token in the headers
        },
      });
      console.log('Video post response:', response.data); // Debug: Log post response
      window.location.reload(); // Refresh the page after successful submission
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Handle unauthorized error
        alert('Session expired. Please log in again.');
        navigate('/login');
      } else {
        console.error('Error posting video:', error);
      }
    } finally {
      setSubmitting(false); // Set submitting state to false
    }
    event.target.reset();
  };

  // Handle video deletion
  const handleDeleteVideo = async (videoId) => {
    const token = localStorage.getItem('jwt');
    try {
      await axios.delete(`http://localhost:1337/api/vedios/${videoId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      window.location.reload(); // Refresh the page after successful deletion
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  };

  return (
    <div>
      <div className='w-full h-auto bg-blue-100 mx-auto p-4'>
        {/* <h2 className='text-center font-bold md:text-2xl'>VIDEOS PAGE</h2> */}
        
        <form onSubmit={handleVideoSubmit} className='bg-dimwhite h-auto hover:bg-slate-300 lg:w-[500px] lg:mx-auto'>
          <div className='mt-3'>
            <label htmlFor='title' className='font-mono text-x text-black ml-3'>Video Title:</label>
            <input id='title' type='text' required className='mt-3 mb-3 rounded-md' />
          </div>
          <div>
            <label htmlFor='file' className="font-mono text-x text-black ml-3 mt-5">Upload Video:</label>
            <input id='file' type='file' accept='video/*' required />
          </div>
          <div className='mb-3'>
            <button type='submit' className='flex mx-auto mt-5 bg-gray-300 hover:bg-blue-400 rounded-md pr-3 pl-3 hover:text-black-400'>
              {submitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>

        {loading ? (
          <Loading />
        ) : (
          <div>
            {user && (
              <div className='mt-8'>
                <h3 className='text-center font-bold md:text-xl'>My Videos</h3>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4'>
                  {myVideos.length > 0 ? (
                    myVideos.map((video) => (
                      <div key={video.id} className='bg-white h-max p-4 rounded shadow'>
                        <h3>{video.title}</h3>
                        {video.url ? (
                          <video width='100%' height='100' controls>
                            <source src={`http://localhost:1337${video.url}`} type='video/mp4' />
                          </video>
                        ) : (
                          <p>No video available</p>
                        )}
                        <button onClick={() => handleDeleteVideo(video.id)} className='mt-2 bg-red-500 text-white px-4 py-2 rounded'>
                          Delete
                        </button>
                      </div>
                    ))
                  ) : (
                    <p>No videos found.</p>
                  )}
                </div>
              </div>
            )}

            <div className='mt-8'>
              <h3 className='text-center font-bold md:text-xl'>All Videos</h3>
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4'>
                {allVideos.map((video) => (
                  <div key={video.id} className='bg-white h-max p-4 rounded shadow'>
                    <h3>{video.title}</h3>
                    {video.url ? (
                      <video width='100%' height='100' controls>
                        <source src={`http://localhost:1337${video.url}`} type='video/mp4' />
                      </video>
                    ) : (
                      <p>No video available</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {showModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl mb-4">You must be logged in to submit a video</h2>
              <button
                onClick={() => navigate('/login')}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Log In
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md ml-2"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Videos;
