import { create } from 'zustand';

export default create((set, get) => ({
  data: null,
  total: null,
  loaded: false,
  setData: async () => {
    const { getData, formatData } = get();

    const data = await getData();
    const formattedData = formatData(data);

    set({ data: formattedData, loaded: true });
  },

  setTotal: async () => {
    try {
      const response = await fetch('/api/sheets/read-spreadsheet-total');
      const data = await response.json();

      set({ total: data });
    } catch (err) {
      console.log('Error fetching data', err);
    }
  },

  getData: async () => {
    try {
      const response = await fetch('/api/sheets/read-spreadsheet-cost');
      const data = await response.json();

      return data;
    } catch (err) {
      console.log('Error fetching data', err);
      return null;
    }
  },

  formatData: (data) => {
    const formattedData = {};

    data?.forEach((entry) => {
      const requestId = BigInt(
        '0x' + entry.requestId.slice(2).slice(-64),
      ).toString();
      formattedData[requestId] = {
        transmissionCost: entry.transmissionCost,
        baseFee: entry.baseFee,
        totalCost: entry.totalCost,
        errorMsg: entry.errorMsg || null,
      };
    });

    return formattedData;
  },
}));
