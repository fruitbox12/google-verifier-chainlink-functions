import { gql } from '@apollo/client';

const config = {
  getTwitterVerificationRequests: gql`
    query GetTwitterVerificationRequests {
      twitterVerificationRequests {
        id
        requestId
        result
        timestamp
      }
    }
  `,
  getTweet: (address) => `Verifying my account for ${address}`,
};

export default config;
