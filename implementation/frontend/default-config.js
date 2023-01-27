import { gql } from '@apollo/client';

const config = {
  getTwitterVerificationRequests: gql`
    {
      twitterVerificationRequests(
        first: 1000
        orderBy: timestamp
        orderDirection: desc
      ) {
        id
        requestId
        result
        timestamp
      }
    }
  `,
  getTweet: (address) => `Verifying my Twitter account for ${address}`,
};

export default config;
