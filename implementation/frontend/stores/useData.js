import { create } from 'zustand';
import useApolloClient from './useApolloClient';
import config from '../default-config';

const { getTwitterVerificationRequests } = config;

export default create((set, get) => ({
  data: null,
  loaded: false,
  setData: async () => {
    const { getDataFromGraph, formatData } = get();

    const fetched = await getDataFromGraph();
    const formatted = formatData(fetched);

    set({ data: formatted, loaded: true });
  },

  getDataFromGraph: async () => {
    const { apolloClient, getApolloClient } = useApolloClient.getState();
    const client = apolloClient || getApolloClient();

    const { data } = await client.query({
      query: getTwitterVerificationRequests,
    });

    return data;
  },

  formatData: (data) => {
    const formatted = data.twitterVerificationRequests.map((item) => {
      let data = null;
      let error = false;

      // Decode id and request id from hex to number ; they can be very long hex so careful with the slice
      const id = BigInt('0x' + item.id.slice(2).slice(-64)).toString();
      const requestId = BigInt(
        '0x' + item.requestId.slice(2).slice(-64),
      ).toString();

      try {
        // Decode from hex
        const decodedResult = Buffer.from(
          item.result.slice(2),
          'hex',
        ).toString();

        // Create an object with the fields
        const fields = ['result', 'username', 'address'];
        const objResult = decodedResult.split(',').reduce((acc, cur, i) => {
          acc[fields[i]] = cur;
          return acc;
        }, {});

        data = objResult;
      } catch (e) {
        console.log('Error decoding result', e);
      }

      // If data is null or doesn't have all fields, return null
      if (!data || !data.result || !data.username || !data.address) {
        data = null;
        error = true;
      }

      return {
        id,
        requestId,
        data,
        error,
      };
    });

    return formatted;
  },
}));
