import { sheets, SHEET_ID } from './client';

const handler = async (req, res) => {
  try {
    const data = await writeSpreadsheetData(req.body);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};

const writeSpreadsheetData = async (data) => {
  const res = await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: 'A2:E',
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    resource: {
      values: [
        [
          data.requestId,
          data.transmissionCost,
          data.baseFee,
          data.totalCost,
          data.errorMsg ? data.errorMsg : '',
        ],
      ],
    },
  });
  return res;
};

export default handler;
