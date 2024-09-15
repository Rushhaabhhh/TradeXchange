import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faTimes, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { ethers } from 'ethers';
import { WalletIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthModals = ({ isLoginModalOpen, onClose, handleAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); 

  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = async (e, type) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:8080/user/login', { email, password });
      
      if (response.data.success) {
        console.log('Login successful');
        handleAuth(type, email, password);
        onClose();
        navigate('/marketplace');
      } else {
        switch (response.data.message) {
          case 'Invalid user':
            setErrorMessage('The email address you entered does not exist.');
            break;
          case 'Wrong password':
            setErrorMessage('The password you entered is incorrect.');
            break;
          default:
            setErrorMessage(response.data.message || 'Login failed');
            break;
        }
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage('An error occurred while processing your request.');
      } else if (error.request) {
        setErrorMessage('No response from server. Please check your network connection.');
      } else {
        setErrorMessage('An unexpected error occurred. Please try again later.');
      }
    }
  };
  
  

  const connectMetaMask = async () => {
    setErrorMessage(''); 
    try {
      if (typeof window.ethereum !== 'undefined') {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        console.log('Connected address:', address);

        const response = await fetch('YOUR_API_ENDPOINT_HERE', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ walletAddress: address }),
        });

        const data = await response.json();
        if (data.success) {
          console.log('Login successful');
        } else {
          setErrorMessage(data.message || 'Login failed');
        }
      } else {
        setErrorMessage('MetaMask is not installed');
      }
    } catch (error) {
      if (error.code === 4001) {
        setErrorMessage('User rejected the connection request');
      } else {
        setErrorMessage('Error connecting to MetaMask');
      }
      console.error('Error connecting to MetaMask:', error);
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
              <button onClick={onClose} className="ml-4 text-4xl text-red-800 hover:text-red-600">
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
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>

              {errorMessage && (
                <p className="text-red-500 text-center">{errorMessage}</p> 
              )}

              <button type="submit" className="w-full bg-gray-900 p-2 rounded-xl text-white">Log In</button>
            </form>

            <p className="text-gray-400 text-center mt-2 mb-2">OR</p>

            <div>
              <button
                onClick={connectMetaMask}
                className="w-full bg-orange-500 p-2 rounded-xl text-white flex items-center justify-center"
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
