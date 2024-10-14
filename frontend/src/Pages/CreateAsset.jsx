import React, { useState } from 'react';
import axios from 'axios';

const CreateAsset = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [userId, setUserId] = useState('');  
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    const userId = localStorage.getItem('userId');
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/asset/', {
        title,
        description,
        price,
        image,
        userId, 
      });

      console.log(response.data);

      setSuccessMessage('Asset created successfully!');
      setErrorMessage('');
      setTitle('');
      setDescription('');
      setPrice('');
      setImage('');
    } catch (error) {
      console.error('Error creating asset:', error);
      setErrorMessage('Failed to create asset. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-gray-800 p-6 rounded-lg text-white shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Create a New Asset</h2>

      {successMessage && <p className="bg-green-500 p-3 rounded mb-4">{successMessage}</p>}
      {errorMessage && <p className="bg-red-500 p-3 rounded mb-4">{errorMessage}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-lg mb-2">Asset Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 rounded-lg bg-gray-700 text-white"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-lg mb-2">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 rounded-lg bg-gray-700 text-white"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-lg mb-2">Price (ETH)</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 rounded-lg bg-gray-700 text-white"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block text-lg mb-2">Image URL</label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full p-2 rounded-lg bg-gray-700 text-white"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-blue-600 hover:bg-blue-500 rounded-lg text-white"
        >
          Create Asset
        </button>
      </form>
    </div>
  );
};

export default CreateAsset;
