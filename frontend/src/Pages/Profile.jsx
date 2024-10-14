import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Components/NavBar';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(() => {
    // Retrieve background image from localStorage if it exists
    return localStorage.getItem('backgroundImage') || null;
  });
  const userId = localStorage.getItem('userId'); 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/user/${userId}`); 
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBackgroundImage(reader.result);
        // Store the background image in localStorage
        localStorage.setItem('backgroundImage', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!user) {
    return <p className="text-white text-center">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <div className="relative top-24">
        <div
          className="h-64 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="absolute top-2 right-2 p-1 bg-gray-800 text-white rounded border border-gray-600 cursor-pointer"
          />
        </div>

        {/* User Image on Top of the Banner */}
        <div className="absolute top-40 left-4 flex flex-col items-center">
          <img
            src={user.image}
            alt={`${user.username}'s profile`}
            className="h-24 w-24 rounded-full border-4 border-gray-900 shadow-lg"
          />
          {/* User Info Below the Image */}
          <div className="mt-2 text-center text-white">
            <h1 className="text-xl font-bold">{user.username}</h1>
            <p className="text-gray-400">{user.wallet_address}</p>
            <p className="text-gray-400">Joined {new Date(user.created_at).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      <div className="mt-64 mx-4">
        <h2 className="text-lg font-semibold text-white">Assets Owned</h2>
        <div className="mt-2 bg-gray-800 rounded-lg p-4 shadow-lg">
          {user.assets.length > 0 ? (
            <ul className="list-disc list-inside text-white">
              {user.assets.map((asset) => (
                <li key={asset._id} className="mt-2">{asset.title}</li> 
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No assets owned.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
