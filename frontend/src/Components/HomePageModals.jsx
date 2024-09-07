import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faTimes, faEye, faEyeSlash, faUser } from "@fortawesome/free-solid-svg-icons";

const AuthModals = ({ isLoginModalOpen, isSignUpModalOpen, switchModal, onClose, handleAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = (e, type) => {
    e.preventDefault();
    handleAuth(type, email, password);
    setEmail('');
    setPassword('');
  };

  return (
    <>
      {/* Login Modal */}
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
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-gray-400">Remember me</span>
            </div>
            <button className="text-white hover:text-red-600 transition-colors duration-300">
              Forgot Password?
            </button>
          </div>
          <div className="mt-4">
            <span className="text-gray-400">Don't have an account? </span>
            <button
              onClick={switchModal}
              className="text-blue-500 hover:underline"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    )}


      {/* Sign Up Modal */}
      {isSignUpModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-30">
        <div className="bg-gray-800 px-8 py-4 rounded-lg w-96">

          <div className="flex items-center justify-between mb-2">

            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white"> Welcome </span>
              <span className="text-2xl font-bold text-white">to TradeXchange</span>
            </div>

            <button onClick={onClose} className="ml-4 mb-10 text-4xl text-red-800 hover:text-red-600">
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>

          <form onSubmit={(e) => handleSubmit(e, 'signup')} className="space-y-4">

            <div className="relative">
              <FontAwesomeIcon icon={faUser} className="absolute left-3 top-3 text-gray-400" />
              <input type="text" placeholder="Username" required className="w-full p-2 pl-10 rounded-xl bg-gray-700 text-white" />
            </div>
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
            <button type="submit" className="w-full bg-gray-900 p-2 rounded-xl"> Sign Up </button>
          </form>
          <div className="mt-4">
            <span className="text-gray-400">Already have an account? </span>
            <button
              onClick={switchModal}
              className="text-blue-500 hover:underline"
            >
              Log in
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  );
};

export default AuthModals;
