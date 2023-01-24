import { create } from 'zustand';
import { ApolloClient, InMemoryCache } from '@apollo/client';

export default create((set) => ({
  apolloClient: null,
  getApolloClient: () => {
    const client = new ApolloClient({
      cache: new InMemoryCache(),
      uri: process.env.NEXT_PUBLIC_GRAPH_ENDPOINT,
    });

    set({ apolloClient: client });
    return client;
  },
}));
