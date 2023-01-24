const executeRequest = require('./systems/scripts/execute-request');
const { useEncryption } = require('../../hooks');
const { decrypt, testMatch } = useEncryption();

const handler = async (req, res) => {
  const { body } = req;
  const { username, address, encrypted } = body;

  const decrypted = decrypt(encrypted);

  // Make sure the API call is being made from the app with the correct arguments
  if (!testMatch(decrypted, username + address)) {
    return res.status(401).json({ error: 'Invalid encryption' });
  }

  const result = await executeRequest(username, address, 'mumbai', 'provider');
  return res.status(200).json(result);
};

export default handler;
