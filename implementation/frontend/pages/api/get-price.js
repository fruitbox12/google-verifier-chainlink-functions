// API to get price from coinmarketcap

const handler = async (req, res) => {
  const { token } = req.body;

  try {
    const response = await fetch(
      `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${token}`,
      {
        headers: {
          'X-CMC_PRO_API_KEY': process.env.NEXT_PUBLIC_COINMARKETCAP_API_KEY,
        },
      },
    );
    const data = await response.json();
    res.status(200).json(data.data[token].quote.USD.price);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export default handler;
