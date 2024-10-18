import React, { useState, useEffect } from 'react';
import { ShoppingCart, Bitcoin, X, } from 'lucide-react';
import axios from 'axios';
import Navbar from '../Components/NavBar';

const AssetCard = ({ asset, handleAddToCart }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isOwnedByUser, setIsOwnedByUser] = useState(false);

  const buyerId = localStorage.getItem('userId');
  const sellerId = asset.createdBy;

  useEffect(() => {
    if (asset.ownerId === buyerId) {
      setIsOwnedByUser(true);
    }
  }, [asset.ownerId, buyerId]);

  const handleBuyNowClick = () => {
    handleAddToCart(asset);
  };

  return (
    <div
      className="relative bg-gray-800 rounded-lg shadow-lg text-white pb-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-t-lg">
        <img
          src={asset.image}
          alt={asset.title}
          className={`w-full h-64 object-cover transition-transform duration-300 ease-out ${
            isHovered ? 'scale-105' : 'scale-100'
          }`}
        />
      </div>
      <h3 className="text-xl font-bold px-4 py-2">
        {asset.title || 'Asset Title'}
      </h3>
      <p className="text-gray-400 px-4">
        {asset.description || 'This is a short description of the asset.'}
      </p>
      <p className="text-lg font-semibold px-4 py-1">
        {asset.price ? `${asset.price} ETH` : '$0.00'}
      </p>

      {!isOwnedByUser && isHovered && (
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
  const [cart, setCart] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await axios.get('https://tradexchange-7rcv.onrender.com/asset/');
        setAssets(response.data);
      } catch (error) {
        console.error('Error fetching assets:', error);
      }
    };

    fetchAssets();
  }, []);

  const handleAddToCart = (asset) => {
    setCart((prevCart) => [...prevCart, asset]);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="min-h-screen bg-gray-900 relative">
      <Navbar />
      <button
        onClick={toggleModal}
        className="z-50 bg-gray-700 bg-opacity-40 px-4 py-2 rounded-full text-white flex items-center justify-center shadow-lg hover:bg-gray-700 transition-all fixed mt-6 right-2"
      >
        <ShoppingCart className="mx-auto mr-3" />
        Buy
        {cart.length > 0 && (
          <span className="bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full absolute -top-2 -right-2">
            {cart.length}
          </span>
        )}
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-end top-20">
          <div className="bg-gray-800 w-80 h-full shadow-lg p-6 text-white relative">
            <button
              onClick={toggleModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-200"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
            {cart.length > 0 ? (
              <div className="space-y-4">
                {cart.map((item, index) => (
                  <div
                    key={index}
                    className="bg-gray-700 p-4 rounded-lg flex justify-between"
                  >
                    <div>
                      <h3 className="font-bold">{item.title}</h3>
                      <p>{item.price} ETH</p>
                    </div>
                    <Bitcoin size={24} />
                  </div>
                ))}
                <button className="w-full py-2 mt-4 bg-blue-600 rounded-lg hover:bg-blue-500 transition-all">
                  Proceed to Payment
                </button>
              </div>
            ) : (
              <p>Your cart is empty.</p>
            )}
          </div>
        </div>
      )}

      <main className="pt-32 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {assets.map((asset) => (
            <AssetCard key={asset._id} asset={asset} handleAddToCart={handleAddToCart} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Marketplace;
