import executeRequest from './systems/scripts/execute-request';
import { useEncryption } from '../../hooks';
const { decrypt, testMatch } = useEncryption();

const handler = async (req, res) => {
  const { body } = req;
  const { username, address, encrypted, baseUrl } = body;

  try {
    const decrypted = decrypt(encrypted);

    // Make sure the API call is being made from the app with the correct arguments
    if (!testMatch(decrypted, username + address)) {
      return res.status(401).json({ error: 'Invalid encryption' });
    }

    const result = await executeRequest(username, address, 'mumbai');

    // Update the spreadsheet with the new data
    const updateSuccess = await updateSpreadsheetCost(result, baseUrl);
    // We don't really need that success value, but it's here anyway

    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const updateSpreadsheetCost = async (result, baseUrl) => {
  console.log(result);
  if (!result) return false;
  if (!result.billing) return false;

  try {
    const response = await fetch(
      `${baseUrl}/api/sheets/write-spreadsheet-cost`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...result.billing,
          requestId: result.requestId,
          errorMsg: result.errorMsg,
        }),
      },
    );
    const data = await response.json();
    console.log(data);

    const success = data.data.updates.updatedRows === 1;
    if (!success) {
      return false;
    }

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export default handler;
