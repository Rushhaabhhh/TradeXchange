import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Components/NavBar';
import { Pencil } from 'lucide-react';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(() => {
    return localStorage.getItem('backgroundImage') || null;
  });
  const [profileImage, setProfileImage] = useState(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [isNameHovered, setIsNameHovered] = useState(false);
  const userId = localStorage.getItem('userId');
  const walletAddress = localStorage.getItem('walletAddress');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/user/${userId}`);
        setUser(response.data);
        setNewUsername(response.data.username); // Set initial username
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const handleProfileImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        setProfileImage(reader.result);

        try {
          await axios.put(`http://localhost:8080/update/${userId}`, { 
            image: reader.result, 
            walletAddress: walletAddress 
          });
        } catch (error) {
          console.error('Error updating profile image and wallet address:', error);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackgroundImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBackgroundImage(reader.result);
        localStorage.setItem('backgroundImage', reader.result); 
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUsernameChange = async () => {
    try {
      await axios.put(`http://localhost:8080/update/${userId}`, { username: newUsername });
      setIsEditingName(false);
    } catch (error) {
      console.error('Error updating username:', error);
    }
  };

  const handleNameMouseEnter = () => {
    setIsNameHovered(true);
  };

  const handleNameMouseLeave = () => {
    setIsNameHovered(false);
  };

  if (!user) {
    return <p className="text-white text-center">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <div className="relative top-24">

        <div
          className="h-64 bg-cover bg-center relative group"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <label htmlFor="background-input" className="cursor-pointer">
            <Pencil className="absolute inset-0 m-auto text-white cursor-pointer opacity-0 group-hover:opacity-80" size={40} />
          </label>
          <input
            id="background-input"
            type="file"
            accept="image/*"
            onChange={handleBackgroundImageUpload}
            className="hidden"
          />
        </div>

        <div className="absolute top-28 left-8 flex flex-col items-center">

          <div className="relative group">
            <img
              src={profileImage || user.image}
              alt={`${user.username}'s profile`}
              className="h-44 w-44 rounded-full border-4 border-gray-900 shadow-lg"
            />
            <label htmlFor="profile-input" className="cursor-pointer">
              <Pencil className="absolute inset-0 m-auto text-white cursor-pointer opacity-0 group-hover:opacity-80" size={40} />
            </label>
            <input
              id="profile-input"
              type="file"
              accept="image/*"
              onChange={handleProfileImageUpload}
              className="hidden"
            />
          </div>

          <div
            className="mt-2 text-white"
            onMouseEnter={handleNameMouseEnter}
            onMouseLeave={handleNameMouseLeave}
          >
            {isEditingName ? (
              <div className="flex items-center">
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className="bg-gray-700 text-white rounded p-1 text-2xl font-bold"
                />
                <button
                  onClick={handleUsernameChange}
                  className="ml-2 text-green-400"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex items-center">
                <h1 className="text-4xl font-bold">{newUsername}</h1>
                {isNameHovered && (
                  <Pencil
                    className="ml-2 text-white cursor-pointer"
                    size={20}
                    onClick={() => setIsEditingName(true)}
                  />
                )}
              </div>
            )}

            <div className="flex items-center space-x-6 mt-2">
              <p className="text-white text-lg">
                {walletAddress.slice(0, 5)}...{walletAddress.slice(-4)}
              </p>
              <p className="text-gray-400 text-lg">
                Joined {new Date(user.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Assets Section */}
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
