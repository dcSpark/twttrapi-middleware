# twttrapi-middleware

A Node.js module to interact with the Twitter API via RapidAPI's twttrapi service. This middleware provides a simplified interface for accessing Twitter data without directly using the official Twitter API.

## Features

- Get tweet by ID
- Get user tweets, replies, and media
- Search tweets (latest and top results)
- Search users
- Get user profile information
- Get user followers and following lists

## Installation

```bash
npm install twttrapi-middleware
```

## Requirements

You need a RapidAPI key with access to the twttrapi service. Sign up at [RapidAPI](https://rapidapi.com) and subscribe to the [twttrapi](https://rapidapi.com/twttrapi/api/twttrapi) service.

## Usage

```typescript
import TwttrApi from "twttrapi-middleware";

// Initialize with your RapidAPI key
const twttr = new TwttrApi('your-rapidapi-key', true); // Second parameter enables debug mode

// Example: Get a tweet by ID
twttr.getTweetById('1907254694163980405')
  .then(tweet => console.log(tweet))
  .catch(error => console.error(error));

// Example: Get a user's tweets
twttr.getUserTweets('username')
  .then(tweets => console.log(tweets))
  .catch(error => console.error(error));
```

## API Reference

### Constructor

```typescript
new TwttrApi(rapidapiKey: string, debug: boolean = false)
```

- `rapidapiKey`: Your RapidAPI key
- `debug`: Optional boolean to enable debug mode (defaults to false)

### Methods

All methods return a Promise that resolves to the requested data or an error response.

- `getTweetById(id: string)`: Get a tweet by its ID
- `getUserTweets(username: string)`: Get tweets from a user
- `getUserReplies(username: string)`: Get replies from a user
- `getUserMedia(username: string)`: Get media tweets from a user
- `searchTop(query: string)`: Search top tweets for a query
- `searchLatest(query: string)`: Search latest tweets for a query
- `searchUsers(query: string)`: Search users by query
- `getUser(username: string)`: Get a user's profile information
- `getUserFollowers(username: string)`: Get a user's followers
- `getUserFollowing(username: string)`: Get accounts a user is following

## Response Types

The module primarily returns `Tweet`, `User`, and `Media` objects or `ErrorResponse` if an error occurs.

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Run tests
npm test

# Run in development mode
npm run dev
```

## License

MIT © [dcSpark](https://dcspark.io)
