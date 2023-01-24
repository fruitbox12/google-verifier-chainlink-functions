import { create } from 'zustand';
import config from '../default-config';

const { theGraphUrl: THE_GRAPH_URL } = config;

export default create((set) => ({
  data: null,
  loaded: false,
  setData: async () => {
    // Get the data from The Graph
    const fetched = await getDataFromGraph(THE_GRAPH_URL);
    // Format it
    const formatted = formatData(fetched);

    set({ data: formatted, loaded: true });
  },

  getDataFromGraph: async (url) => {
    //
  },

  formatData: (data) => {
    //
  },
}));
