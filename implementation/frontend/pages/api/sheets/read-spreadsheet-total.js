import { sheets, SHEET_ID } from './client';

const handler = async (req, res) => {
  try {
    const data = await getSpreadsheetData();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getSpreadsheetData = async () => {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: 'J2:L2',
  });

  const data = res.data.values[0];

  if (!data) {
    return {
      totalRequests: 'error',
      totalCost: 'error',
      averageCost: 'error',
    };
  }

  return {
    totalRequests: data[0],
    totalCost: data[1],
    averageCost: data[2],
  };
};

export default handler;
