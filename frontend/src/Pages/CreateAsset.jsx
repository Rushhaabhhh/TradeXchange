import React, { useState } from 'react';
import axios from 'axios';
import { AlertCircle, CheckCircle } from 'lucide-react';

const CreateAsset = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    const userId = localStorage.getItem('userId');
    if (!userId) {
      setErrorMessage('User not authenticated. Please log in.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post('https://tradexchange-7rcv.onrender.com/asset/', {
        title,
        description,
        price: parseFloat(price),
        image,
        userId,
      });

      console.log(response.data);
      setSuccessMessage('Asset created successfully!');
      setTitle('');
      setDescription('');
      setPrice('');
      setImage('');
    } catch (error) {
      console.error('Error creating asset:', error);
      setErrorMessage(error.response?.data?.message || 'Failed to create asset. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-gray-800 p-6 rounded-lg text-white shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Create a New Asset</h2>

      {successMessage && (
        <div className="mb-4 p-4 bg-green-500 rounded-lg flex items-center">
          <CheckCircle className="h-5 w-5 mr-2" />
          <span>{successMessage}</span>
        </div>
      )}
      {errorMessage && (
        <div className="mb-4 p-4 bg-red-500 rounded-lg flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          <span>{errorMessage}</span>
        </div>
      )}

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
            step="0.000001"
            min="0"
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
          className="w-full p-3 bg-blue-600 hover:bg-blue-500 rounded-lg text-white disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? 'Creating...' : 'Create Asset'}
        </button>
      </form>
    </div>
  );
};

export default CreateAsset;