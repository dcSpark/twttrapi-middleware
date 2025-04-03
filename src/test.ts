import TwttrApi from "./index";

const twttr = TwttrApi.getInstance();

async function runTests() {
  console.log('[TwttrAPI] Running tests...');
  console.log('[TwttrAPI] Getting tweet by id...');
  await twttr.getTweetById('1907254694163980405').then(x => console.log(JSON.stringify(x, null, 2)));
  console.log('[TwttrAPI] Getting user replies...');
  await twttr.getUserReplies('NicoArqueros').then(x => console.log(JSON.stringify(x, null, 2)));
  console.log('[TwttrAPI] Getting user tweets...');
  await twttr.getUserTweets('NicoArqueros').then(x => console.log(JSON.stringify(x, null, 2)));
  console.log('[TwttrAPI] Getting user...');
  await twttr.getUser('NicoArqueros').then(x => console.log(JSON.stringify(x, null, 2)));
  console.log('[TwttrAPI] Getting user media...');
  await twttr.getUserMedia('NicoArqueros').then(x => console.log(JSON.stringify(x, null, 2)));
  console.log('[TwttrAPI] Getting user followers...');
  await twttr.getUserFollowers('NicoArqueros').then(x => console.log(JSON.stringify(x, null, 2)));
  console.log('[TwttrAPI] Getting user following...');
  await twttr.getUserFollowing('NicoArqueros').then(x => console.log(JSON.stringify(x, null, 2)));
  console.log('[TwttrAPI] Searching users...');
  await twttr.searchUsers('NicoArqueros').then(x => console.log(JSON.stringify(x, null, 2)));
  console.log('[TwttrAPI] Searching latest...');
  await twttr.searchLatest('NicoArqueros').then(x => console.log(JSON.stringify(x, null, 2)));
  console.log('[TwttrAPI] Searching top...');
  await twttr.searchTop('NicoArqueros').then(x => console.log(JSON.stringify(x, null, 2)));
  console.log('[TwttrAPI] Tests completed.');
}

runTests();