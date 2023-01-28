/**
  const twitterUsername = args[0];
  const ethereumAddress = args[1];
  const requiredStringIncluded = 'Verifying my Twitter account for ' + ethereumAddress;
  let result = -1;

  // Get the bearer token from the environment variables
  if (
    !secrets.apiKey ||
    secrets.apiKey ===
      'A valid bearer token needs to be passed in the Authorization header. Get a free one: https://developer.twitter.com/en/docs/authentication/oauth-2-0/bearer-tokens'
  ) {
    throw Error(
      'TWITTER_BEARER_TOKEN environment variable not set for Twitter API',
    );
  }

  // Don't even try if the username or address is empty
  if (!twitterUsername || !ethereumAddress) {
    throw Error('Twitter username or Ethereum address is empty');
  }

  // Prepare the API requests
  const twitterRequest = {
    // Get the user id from the provided username
    userIdByUsername: () =>
      Functions.makeHttpRequest({
        url: 'https://api.twitter.com/2/users/by/username/' + twitterUsername,
        headers: { Authorization: 'Bearer ' + secrets.apiKey },
      }),
    // Get the latest 10 tweets from the user
    lastTweetsByUserId: (userId) =>
      Functions.makeHttpRequest({
        url: 'https://api.twitter.com/2/users/' + userId + '/tweets?max_results=10',
        headers: { Authorization: 'Bearer ' + secrets.apiKey },
      }),
  };

  // First, request the user id
  const idRes = await new Promise((resolve, reject) => {
    twitterRequest.userIdByUsername().then((res) => {
      if (!res.error) {
        resolve(res);
      } else {
        reject(res);
      }
    });
  });

  if (idRes.error) {
    throw Error('Twitter API request failed');
  }

  const userId = idRes.data.data.id;

  // Then, request the latest tweets
  const tweetsRes = await new Promise((resolve, reject) => {
    twitterRequest.lastTweetsByUserId(userId).then((res) => {
      if (!res.error) {
        resolve(res);
      } else {
        reject(res);
      }
    });
  });

  if (tweetsRes.error) {
    throw Error('Twitter API request failed');
  }

  // If it's successful
  const tweets = tweetsRes.data.data;
  try {
    const tweetTexts =
      tweets && tweets.length > 0 ? tweets.map((tweet) => tweet.text) : [];
    // Check if any of the last 10 tweets include the required string
    const res = tweetTexts.some((text) =>
      text.toLowerCase().includes(requiredStringIncluded.toLowerCase()),
    );
    // If so, response = 1, if not response = 0
    result = res ? 1 : 0;
  } catch (e) {
    result = -1;
  }

  // Return 1 (verified) or 0 (not verified) + username + address
  // If something went wrong, yet no error was thrown, result will return -1

  return Functions.encodeString(
    JSON.stringify({
      result,
      username: twitterUsername,
      address: ethereumAddress,
    }),
  );
**/
