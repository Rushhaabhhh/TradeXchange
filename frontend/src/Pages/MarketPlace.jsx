import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import axios from 'axios';  
import Navbar from '../Components/NavBar';

const AssetCard = ({ asset }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleBuyNowClick = () => {
    // Logic to add the asset to the cart can go here
  };

  return (
    <div
      className="relative bg-gray-800 rounded-lg shadow-lg text-white pb-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img 
        src={asset.image} 
        alt={asset.title} 
        className={`w-full h-64 object-cover transition-transform duration-300 ease-out transform hover:scale-105 ${isHovered ? 'scale-105' : 'scale-100'} rounded-t-lg`} 
      />
      <h3 className="text-xl font-bold px-4 py-2">{asset.title || "Asset Title"}</h3>
      <p className="text-gray-400 px-4">{asset.description || "This is a short description of the asset."}</p>
      <p className="text-lg font-semibold px-4 py-1">{asset.price ? `${asset.price} ETH` : "$0.00"}</p>

      {isHovered && (
        <button
          onClick={handleBuyNowClick}
          className="absolute left-0 right-0 mx-auto w-full px-4 py-2 bg-blue-600 rounded-b-lg hover:bg-blue-500 transition-colors duration-300 flex items-center justify-center"
        >
          <ShoppingCart className="mr-2" /> 
          Buy Now
        </button>
      )}
    </div>
  );
};

const Marketplace = () => {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await axios.get('http://localhost:8080/asset/');
        setAssets(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching assets:', error);
      }
    };

    fetchAssets();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <main className="pt-32 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {assets.map((asset) => (
            <AssetCard key={asset._id} asset={asset} /> 
          ))}
        </div>
      </main>
    </div>
  );
};

export default Marketplace;
