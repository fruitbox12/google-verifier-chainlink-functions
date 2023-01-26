import { useEffect, useState } from 'react';

const useCMK = (token) => {
  const [priceInDollar, setPriceInDollar] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const getTokenValue = async () => {
    try {
      setPriceInDollar(await fetchFromCMK());
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFromCMK = async () => {
    const response = await fetch('/api/get-price', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    getTokenValue();
  }, []);

  return { priceInDollar, error, loading };
};

export default useCMK;
