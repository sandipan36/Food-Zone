import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProfilePage() {
    const [user, setUser] = useState(null);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordSuccess, setPasswordSuccess] = useState('');

    // Fetch user details
    const fetchUser = async () => {
        try {
            const token = localStorage.getItem('jwt');
            if (token) {
                const userResponse = await axios.get('https://six9foodzonee.onrender.com/api/users/me?populate=*', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log('User data:', userResponse.data); // Log user data to inspect the structure
                setUser(userResponse.data);
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error('Failed to fetch user:', error);
            setUser(null);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    // Handle password change
    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setPasswordError("Passwords don't match.");
            return;
        }

        try {
            const token = localStorage.getItem('jwt');
            const changePasswordResponse = await axios.put(
                'https://six9foodzonee.onrender.com/api/users/change-password',
                {
                    currentPassword,
                    newPassword,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setPasswordSuccess(changePasswordResponse.data.message);
            setPasswordError('');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error) {
            setPasswordError(error.response.data.message);
            setPasswordSuccess('');
        }
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className='container bg-slate-400 w-[600px]  rounded-lg shadow-2xl mb-6 mx-auto mt-10'>
            <h2 className='text-3xl font-semibold mb-5 pt-2 text-center uppercase'> Profile</h2>
            <div className='max-w-md mx-auto'>
                {user.avtar && user.avtar.url ? (
                    <div className='mb-4'>
                        <img src={`https://six9foodzonee.onrender.com${user.avtar.url}`} alt='Avatar' className='rounded-full w-32 h-32 mx-auto' />
                    </div>
                ) : (
                    <p> </p>
                )}
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2'>Username</label>
                    <p>{user.username}</p>
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2'>Email</label>
                    <p>{user.email}</p>
                </div>
                {/* Additional fields as per your user data */}
            </div>

            <hr className='my-8' />

            <div className='max-w-md mx-auto'>
                <h3 className='text-xl font-semibold mb-3'>Change Password</h3>
                {passwordError && (
                    <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-2 mb-4 rounded'>
                        {passwordError}
                    </div>
                )}
                {passwordSuccess && (
                    <div className='bg-green-100 border border-green-400 text-green-700 px-4 py-2 mb-4 rounded'>
                        {passwordSuccess}
                    </div>
                )}
                <form onSubmit={handleChangePassword}>
                    <div className='mb-4'>
                        <label htmlFor='currentPassword' className='block text-gray-700 text-sm font-bold mb-2'>
                            Current Password
                        </label>
                        <input
                            type='password'
                            id='currentPassword'
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='newPassword' className='block text-gray-700 text-sm font-bold mb-2'>
                            New Password
                        </label>
                        <input
                            type='password'
                            id='newPassword'
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='confirmPassword' className='block text-gray-700 text-sm font-bold mb-2'>
                            Confirm New Password
                        </label>
                        <input
                            type='password'
                            id='confirmPassword'
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type='submit'
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex mx-auto '
                    >
                        Change Password
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ProfilePage;
