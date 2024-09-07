import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement, Filler } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement, Filler);

const CryptoChart = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/ethereum/market_chart', {
          params: {
            vs_currency: 'inr',
            days: '7',
          }
        });
        const prices = response.data.prices;
        const labels = prices.map(price => new Date(price[0]).toLocaleDateString());
        const data = prices.map(price => price[1]);

        setLabels(labels);
        setCryptoData(data);
      } catch (error) {
        console.error('Error fetching crypto data:', error);
      }
    };

    fetchCryptoData();
  }, []);

  const data = {
    labels,
    datasets: [
      {
        label: 'Ethereum Price (INR)',
        data: cryptoData,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        ticks: {
          maxTicksLimit: 7,
        },
      },
    },
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-3/4 mb-12 ml-4">
      <h2 className="text-2xl font-bold mb-4">Ethereum Price Over the Last Week (INR)</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default CryptoChart;
