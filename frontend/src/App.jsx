import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './Pages/Home';
import MarketPlace from './Pages/MarketPlace';
import CreateAsset from './Pages/CreateAsset';
import Profile from './Pages/Profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/marketplace" element={<MarketPlace />} />
        <Route path='/create' element={<CreateAsset />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
