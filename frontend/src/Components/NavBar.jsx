
import React from 'react';
import { useState } from 'react';
import Web3 from 'web3';
import logo from "../assets/LogoIcon.png";
import { Route } from 'react-router-dom';

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
//   const history = useHistory();

  const handleNetworkChange = async () => {
    // Initialize Web3 and MetaMask
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
    // Open MetaMask network change dialog (if supported)
    try {
      await web3.currentProvider.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: '0x1' }] });
    } catch (error) {
      console.error('Error switching network:', error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-red-400 z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="text-xl font-bold">

          <div className='flex items-center space-x-8 align-center '>
              <a href="/" className="flex items-center py-2">
                <img src={logo} alt="Logo" className="h-10 w-10 mr-2" />
                <span className="text-3xl font-bold text-white">TradeXchange</span>
              </a>
            <button 
              onClick={() => Route.push('/create')}
              className=" text-white text-3xl py-2 hover:text-opacity-80">
              Create
            </button>

            <input 
              type="text" 
              placeholder="Search..." 
              className="p-2 ml-20 border border-gray-300 rounded"
            />
          </div>


        </div>
        <div className="flex items-center space-x-4">

          <div className="relative">
            <button 
              onClick={() => setDropdownOpen(!isDropdownOpen)}
              className="bg-gray-200 px-4 py-2 rounded">
              Profile
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded w-48">
                <a href="/profile" className="block px-4 py-2">My Profile</a>
                <a href="/logout" className="block px-4 py-2">Logout</a>
              </div>
            )}
          </div>
          <button 
            onClick={handleNetworkChange}
            className="bg-gray-200 px-4 py-2 rounded">
            Change Network
          </button>
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
