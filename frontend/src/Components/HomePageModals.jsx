import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faTimes, faEye, faEyeSlash, faUser } from "@fortawesome/free-solid-svg-icons";
import { ethers } from 'ethers';
import { WalletIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AuthModals = ({ isLoginModalOpen, onClose, handleAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = (e, type) => {
    e.preventDefault();
    handleAuth(type, email, password);
    setEmail('');
    setPassword('');
    onClose();
    navigate('/marketplace');
  };

  const connectMetaMask = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        console.log('Connected address:', address);
      
        const response = await fetch('////////////////////////', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ walletAddress: address }),
        });
  
        const data = await response.json();
        if (data.success) {
          console.log('Login successful');
        } else {
          console.error('Login failed:', data.message);
        }
      } else {
        console.error('MetaMask is not installed');
      }
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
      if (error.code === 4001) {
        console.error('User rejected the connection request');
      }
    }
  };

  return (
    <>
      {isLoginModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-20">
          <div className="bg-gray-800 px-8 py-4 rounded-lg w-96">
            <div className="flex items-center justify-between mb-8">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white">Hello,</span>
                <span className="text-2xl font-bold text-white">Welcome Back!</span>
              </div>
              <button onClick={onClose} className="ml-4 mb-10 text-4xl text-red-800 hover:text-red-600">
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            <form onSubmit={(e) => handleSubmit(e, 'login')} className="space-y-4">
              <div className="relative">
                <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-2 pl-10 rounded-xl bg-gray-700 text-white"
                />
              </div>
              <div className="relative">
                <FontAwesomeIcon icon={faLock} className="absolute left-3 top-3 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full p-2 pl-10 rounded-xl bg-gray-700 text-white"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-3 text-gray-400"
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className='mb-2' />
                </button>
              </div>

              <button type="submit" className="w-full bg-gray-900 p-2 rounded-xl"> Log In </button>
            </form>

            <p className='text-gray-400 text-center mt-2 mb-2'> OR</p>

            <div >
              <button
                onClick={connectMetaMask}
                className="w-full bg-orange-500 text-white p-2 rounded-xl flex items-center justify-center"
              >
                <WalletIcon className="mr-2" /> Connect with MetaMask
              </button>
            </div>
            
          </div>
        </div>
      )}
    </>
  );
};

export default AuthModals;
