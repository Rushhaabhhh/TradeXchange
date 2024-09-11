import React, { useState, useEffect } from 'react';
import Navbar from '../Components/NavBar';


const Marketplace = () => {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    const fetchAssets = async () => {
      const response = await fetch('/api/assets');
      const data = await response.json();
      setAssets(data);
    };

    fetchAssets();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900">
        <Navbar />
      <main className="pt-16 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {assets.map((asset) => (
            <AssetCard key={asset.id} asset={asset} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Marketplace;
