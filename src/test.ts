import { TwttrApi } from "./index";
import { Tweet, User, Media, ErrorResponse } from "./types";

const apiKey = process.env.RAPID_API_KEY;

if (!apiKey) {
  throw new Error('RAPID_API_KEY is not set');
}

const api = TwttrApi.getInstance(apiKey, true);

async function runTests() {
  console.log('[TwttrAPI] Running tests...');
  console.log('[TwttrAPI] Getting tweet by id...');
  await api.getTweetById('1907254694163980405').then((x: Tweet | ErrorResponse) => console.log(JSON.stringify(x, null, 2)));
  console.log('[TwttrAPI] Getting user replies...');
  await api.getUserReplies('NicoArqueros').then((x: Tweet[] | ErrorResponse) => console.log(JSON.stringify(x, null, 2)));
  console.log('[TwttrAPI] Getting user tweets...');
  await api.getUserTweets('NicoArqueros').then((x: Tweet[] | ErrorResponse) => console.log(JSON.stringify(x, null, 2)));
  console.log('[TwttrAPI] Getting user...');
  await api.getUser('NicoArqueros').then((x: User | ErrorResponse) => console.log(JSON.stringify(x, null, 2)));
  console.log('[TwttrAPI] Getting user media...');
  await api.getUserMedia('NicoArqueros').then((x: Media[] | ErrorResponse) => console.log(JSON.stringify(x, null, 2)));
  console.log('[TwttrAPI] Getting user followers...');
  await api.getUserFollowers('NicoArqueros').then((x: User[] | ErrorResponse) => console.log(JSON.stringify(x, null, 2)));
  console.log('[TwttrAPI] Getting user following...');
  await api.getUserFollowing('NicoArqueros').then((x: User[] | ErrorResponse) => console.log(JSON.stringify(x, null, 2)));
  console.log('[TwttrAPI] Searching users...');
  await api.searchUsers('NicoArqueros').then((x: User[] | ErrorResponse) => console.log(JSON.stringify(x, null, 2)));
  console.log('[TwttrAPI] Searching latest...');
  await api.searchLatest('NicoArqueros').then((x: Tweet[] | ErrorResponse) => console.log(JSON.stringify(x, null, 2)));
  console.log('[TwttrAPI] Searching top...');
  await api.searchTop('NicoArqueros').then((x: Tweet[] | ErrorResponse) => console.log(JSON.stringify(x, null, 2)));
  console.log('[TwttrAPI] Tests completed.');
}

runTests();