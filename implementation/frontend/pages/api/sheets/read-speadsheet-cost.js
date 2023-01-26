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
  // Get columns A to D, from row 2 to the end
  // Column 0: requestId, column 1: transmissionCost, column 2: baseFee, column 3: totalCost, column 4: errorMsg
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: 'A2:E',
  });
  const rows = res.data.values;

  if (rows && rows.length) {
    return rows.map((row) => {
      return {
        requestId: row[0],
        transmissionCost: row[1],
        baseFee: row[2],
        totalCost: row[3],
        errorMsg: row[4] ?? null,
      };
    });
  } else {
    console.log('No data found.');
    return null;
  }
};

export default handler;
