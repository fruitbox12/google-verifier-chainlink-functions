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
};

export default config;
