import { run as getTweet } from "./get_tweet.ts";
import { run as getUser } from "./get_user.ts";
import { run as getTweets } from "./get_tweets.ts";
import { run as getReplies } from "./get_replies.ts";
import { run as getFollowers } from "./get_followers.ts";
import { run as getFollowing } from "./get_following.ts";
import { run as getMedia } from "./get_media.ts";
import { run as searchLatest } from "./search_latest.ts";
import { run as searchTop } from "./search_top.ts";
import { run as searchUsers } from "./search_users.ts";

// Add Deno types
declare const Deno: {
    args: string[];
    exit: (code: number) => void;
};

// Parse command line arguments
const args = Deno.args;
const apiKeyArg = args.find((arg: string) => arg.startsWith('--apiKey='))?.split('=')[1];

if (!apiKeyArg) {
  console.error("Error: API key is required. Usage: deno -A index.ts --apiKey=your_api_key");
  Deno.exit(1);
}

const config = { apiKey: apiKeyArg! };

// Example 1: Get a specific tweet
await getTweet(config, { tweetId: "1907254694163980405" })
  .then(result => {
    if (result.error) {
      console.error("Error getting tweet:", result.error);
    } else {
      console.log("Tweet data:", result.data);
    }
});

// Example 2: Get user information
await getUser(config, { username: "NicoArqueros" })
  .then(result => {
    if (result.error) {
      console.error("Error getting user:", result.error);
    } else {
      console.log("User data:", result.data);
    }
});

// Example 3: Get user's tweets
await getTweets(config, { username: "NicoArqueros" })
  .then(result => {
    if (result.error) {
      console.error("Error getting tweets:", result.error);
    } else {
      console.log("User tweets:", result.data);
    }
});

// Example 4: Get user's replies
await getReplies(config, { username: "NicoArqueros" })
  .then(result => {
    if (result.error) {
      console.error("Error getting replies:", result.error);
    } else {
      console.log("User replies:", result.data);
    }
});

// Example 5: Get user's followers
await getFollowers(config, { username: "NicoArqueros" })
  .then(result => {
    if (result.error) {
      console.error("Error getting followers:", result.error);
    } else {
      console.log("User followers:", result.data);
    }
});

// Example 6: Get accounts user is following
await getFollowing(config, { username: "NicoArqueros" })
  .then(result => {
    if (result.error) {
      console.error("Error getting following:", result.error);
    } else {
      console.log("User following:", result.data);
    }
});

// Example 7: Get user's media
await getMedia(config, { username: "NicoArqueros" })
  .then(result => {
    if (result.error) {
      console.error("Error getting media:", result.error);
    } else {
      console.log("User media:", result.data);
    }
});

// Example 8: Search latest tweets
await searchLatest(config, { query: "elon musk" })
  .then(result => {
    if (result.error) {
      console.error("Error searching latest tweets:", result.error);
    } else {
      console.log("Latest search results:", result.data);
    }
});

// Example 9: Search top tweets
await searchTop(config, { query: "elon musk" })
  .then(result => {
    if (result.error) {
      console.error("Error searching top tweets:", result.error);
    } else {
      console.log("Top search results:", result.data);
    }
});

// Example 10: Search users
await searchUsers(config, { query: "elon musk" })
  .then(result => {
    if (result.error) {
      console.error("Error searching users:", result.error);
    } else {
      console.log("User search results:", result.data);
    }
});
