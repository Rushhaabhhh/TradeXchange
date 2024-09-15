import React, { useState } from 'react';
import { LogIn, ChevronDown, ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';

import logo from "../assets/LogoIcon.png";
import AuthModals from '../Components/HomePageModals.jsx';
import CryptoChart from '../Components/CryptoChart.jsx';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-700 rounded-lg bg-gradient-to-br from-black via-gray-900 to-gray-800 mb-2">
      <button
        className="flex justify-between items-center w-full py-5 px-6 text-left text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium">{question}</span>
        {isOpen ? <ChevronUp className="h-5 w-5 text-gray-300" /> : <ChevronDown className="h-5 w-5 text-gray-300" />}
      </button>
      <div
        className={`transition-all duration-300 ease-out overflow-hidden px-6 ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <p className="pb-5 text-gray-300">{answer}</p>
      </div>
    </div>
  );
};

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(true);

  const handleAuth = (email, password) => {
    console.log('Logging in with:', email, password);
    setIsModalOpen(false);
  };

  const faqs = [
    {
      question: "What is TradeXchange?",
      answer: "TradeXchange is a decentralized marketplace for trading digital assets and points without real money."
    },
    {
      question: "Is TradeXchange safe to use?",
      answer: "Yes, TradeXchange prioritizes security and uses advanced encryption to protect user data and assets."
    },
    {
      question: "Can I start trading with just $1?",
      answer: "TradeXchange uses a point system instead of real money. You can start with a small number of points to begin trading."
    },
    {
      question: "Is there an exchange limit between assets?",
      answer: "Exchange limits may vary depending on the type of digital asset. Please check our trading rules for specific details."
    }
  ];

  return (
    <div className="relative min-h-screen bg-dark-green-to-black text-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-radial-green-tl opacity-40"></div>
        <div className="absolute bottom-1/2 right-0 w-1/3 h-1/3 bg-radial-green-br opacity-40"></div>
        <div className="absolute top-1/2 left-0 w-1/3 h-1/3 bg-radial-green-tl opacity-40"></div>
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-radial-green-br opacity-40"></div>
      </div>

      {/* Navbar */}
      <nav className="flex justify-between items-center  p-4 mt-1 fixed top-0 left-0 right-0 z-35">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-14 w-14 mr-2" />
          <span className="text-4xl font-bold">TradeXchange</span>
        </div>
        <div className="flex space-x-4 text-xl cursor-pointer mr-40">
          <Link to="Home" smooth={true} duration={500} offset={-90} className="text-white hover:text-green-400 transition-colors"> Home </Link>
          <Link to="Marketplace" smooth={true} duration={500} offset={-90} className="text-white hover:text-green-400 transition-colors"> Marketplace </Link>
          <Link to="FAQ" smooth={true} duration={500} offset={-90} className="text-white hover:text-green-400 transition-colors"> FAQ </Link>
          <Link to="Contact" smooth={true} duration={500} offset={-90} className="text-white hover:text-green-400 transition-colors"> Contact </Link>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => {
              setIsLoginModalOpen(true);
              setIsModalOpen(true);
            }}
            className="flex items-center px-4 py-2 rounded-3xl text-lg hover:bg-gray-800 hover:bg-opacity-55 transition-colors duration-300 border-color-green-400 border-2"
          >
            <LogIn className="mr-2 h-6 w-6" /> Log In
          </button>
        </div>
      </nav>

      {/* Auth Modals */}
      {isModalOpen && (
        <AuthModals
          isLoginModalOpen={isLoginModalOpen}
          switchModal={() => {}}
          onClose={() => setIsModalOpen(false)}
          handleAuth={handleAuth}
        />
      )}

      {/* Main Content */}
      <section id="Home" className="relative">
        <main className="flex p-8 mt-20">
          {/* Left Side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-1/2 pr-8"
          >
            <div className="ml-5 text-center rounded-3xl w-40 text-lg py-2 mb-4 border border-white">
              Start Today
            </div>
            <h1 
              className="text-5xl font-bold mb-4 ml-5"
              style={{
                background: 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.1), #ffffff, rgba(0, 0, 0, 0.1))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Trade Digital Assets in a Decentralized Marketplace
            </h1>
            <p className="mb-6 mt-8 ml-5 text-2xl">
              <span className="block">Explore, trade, and earn in a secure platform where digital assets</span>
              <span className="block">and points flow seamlessly without real money</span>
            </p>
            <CryptoChart />
          </motion.div>

          {/* Right Side */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-1/2 flex flex-col items-end"
          >
            <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg mb-4 w-full">
              <div className="flex justify-between mb-2">
                <span>Last month</span>
                <span>This month</span>
              </div>
              <div className="flex justify-between text-2xl font-bold">
                <span>$409.36</span>
                <span>$1,024</span>
              </div>
            </div>
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="bg-gray-800 bg-opacity-50 p-4 rounded-lg w-full"
            >
              <p>Buy USDT</p>
              <p>1 USDT = 1.05 USD</p>
            </motion.div>
          </motion.div>
        </main>
      </section>

      {/* Marketplace Section */}
      <section className="p-8 mt-2" id="Marketplace">
        <h2 
          className="text-5xl font-bold mb-4 ml-5"
          style={{
            background: 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.1), #ffffff, rgba(0, 0, 0, 0.1))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          MARKETPLACE
        </h2>
        <div className="flex gap-10">
          <div className="bg-gray-600 bg-opacity-40 h-60 w-60 mx-auto mt-20"></div>
          <div className="bg-gray-600 bg-opacity-40 h-60 w-60 mx-auto mt-20"></div>
          <div className="bg-gray-600 bg-opacity-40 h-60 w-60 mx-auto mt-20"></div>
          <div className="bg-gray-600 bg-opacity-40 h-60 w-60 mx-auto mt-20"></div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className=" text-white p-8" id="FAQ">
          <h2 
          className="text-5xl font-bold mb-8 ml-5"
          style={{
            background: 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.1), #ffffff, rgba(0, 0, 0, 0.1))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Frequently Asked Questions
        </h2>
          <div className="max-w-4xl mx-auto text-left">
          
          <div className="mb-16">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="text-white p-8 " id="Contact">
  <div className="max-w-6xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
    <div className="col-span-1">
      <h3 className="text-2xl font-bold mb-4">Buy Crypto</h3>
      <ul className="space-y-2 text-gray-400">
        <li>Exchanges</li>
        <li>Watchlist</li>
        <li>Portfolio</li>
        <li>NFT</li>
      </ul>
    </div>
    <div className="col-span-1">
      <h3 className="text-2xl font-bold mb-4">Product</h3>
      <ul className="space-y-2 text-gray-400">
        <li>About Us</li>
        <li>Careers</li>
        <li>Blog</li>
        <li>Security</li>
      </ul>
    </div>
    <div className="col-span-1">
      <h3 className="text-2xl font-bold mb-4">Help Center</h3>
      <ul className="space-y-2 text-gray-400">
        <li>Contact Us</li>
        <li>System Status</li>
        <li>Area of Availability</li>
        <li>Privacy Policy</li>
      </ul>
    </div>
    <div className="col-span-1">
      <h3 className="text-2xl font-bold mb-4">Newsletter</h3>
      <p className="text-gray-400 mb-4">Never miss anything crypto when you're on the go</p>
      
    </div>
  </div>
</section>

    </div>
  );
};

export default Home;