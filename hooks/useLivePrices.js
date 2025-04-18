import { useEffect, useState } from 'react';
import axios from 'axios';

const useLivePrices = () => {
  const [prices, setPrices] = useState({
    btc: 0,
    eth: 0,
    usd: 0,
    eur: 0,
    gram_gold: 0,
    quarter_gold: 0,
    half_gold: 0,
    full_gold: 0,
    cumh_gold: 0,
  });

  const fetchPrices = async () => {
    try {
      const res = await axios.get('https://finance.truncgil.com/api/today.json');
      const rates = res.data.Rates;

      setPrices({
        btc: parseFloat(rates.BTC?.Selling) || 0,
        eth: parseFloat(rates.ETH?.Selling) || 0,
        usd: parseFloat(rates.USD?.Buying) || 0,
        eur: parseFloat(rates.EUR?.Buying) || 0,
        gram_gold: parseFloat(rates.GRA?.Buying) || 0,
        quarter_gold: parseFloat(rates.CEY?.Buying) || 0,
        half_gold: parseFloat(rates.YAR?.Buying) || 0,
        full_gold: parseFloat(rates.TAM?.Buying) || 0,
        cumh_gold: parseFloat(rates.CUM?.Buying) || 0,
      });
    } catch (error) {
      console.error('Fiyatlar alınamadı:', error);
    }
  };

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 60000); // her 60 sn'de bir güncelle
    return () => clearInterval(interval);
  }, []);

  return prices;
};

export default useLivePrices;
