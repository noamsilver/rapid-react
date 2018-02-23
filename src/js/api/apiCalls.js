let storage = window.localStorage;

export function createSessionToken(username, password) {
  let usernames = JSON.parse(storage.getItem('usernames'));
  if (usernames && usernames[username]) {
    return null;
  }
  let tokens = JSON.parse(storage.getItem('tokens'));
  let sessionToken = {};
  sessionToken.token = getRandomInt(100000000000000, 999999999999999);
  while (tokens && tokens[sessionToken.token]) { // Using this blocking 'while' loop as it will probably never actually be looped. This is because the random generator has a uniform distribution.
    sessionToken.token = getRandomInt(100000000000000, 999999999999999);
  }
  sessionToken.createTime = Date.now() || new Date().getTime();
  sessionToken.username = username;
  sessionToken.password = password;
  if (!tokens) {
    tokens = {};
  }
  tokens[sessionToken.token] = sessionToken;
  storage.setItem('tokens', JSON.stringify(tokens));
  if (!usernames) {
    usernames = {};
  }
  usernames[username] = sessionToken.token;
  storage.setItem('usernames', JSON.stringify(usernames));

  return sessionToken;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getToken(username, password) {
  let usernames = JSON.parse(storage.getItem('usernames'));
  if (!usernames || !usernames[username]) {
    return null;
  }
  let tokens = JSON.parse(storage.getItem('tokens'));
  let token = tokens[usernames[username]];
  return token.password === password ? token : null;
}