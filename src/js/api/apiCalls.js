const storage = window.localStorage;

export function createSessionToken(username, password) {
  let usernames = JSON.parse(storage.getItem('usernames'));
  if (usernames && usernames[username]) {
    return null;
  }
  let tokens = JSON.parse(storage.getItem('tokens'));
  const sessionToken = {};
  sessionToken.token = getRandomInt(100000000000000, 999999999999999);
  while (tokens && tokens[sessionToken.token]) { // Using this blocking 'while' loop as it will probably never actually be looped. This is because the random generator has a uniform distribution.
    sessionToken.token = getRandomInt(100000000000000, 999999999999999);
  }
  sessionToken.createTime = Date.now() || new Date().getTime();
  sessionToken.username = username;
  sessionToken.password = password;
  sessionToken.position = { x: 0, y: 0 };
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
  delete sessionToken.password;
  return sessionToken;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getTokenCredentials(username, password) {
  const usernames = JSON.parse(storage.getItem('usernames'));
  if (!usernames || !usernames[username]) {
    return null;
  }
  const tokens = JSON.parse(storage.getItem('tokens'));
  const token = tokens[usernames[username]];
  if (token.password === password) {
    delete token.password;
    return token;
  } else {
    return null;
  }
}

export function getToken(token) {
  const tokens = JSON.parse(storage.getItem('tokens'));
  const tokenOb = tokens[token];
  if (tokenOb) {
    delete tokenOb.password;
    return tokenOb;
  } else {
    return null;
  }
}

export function setPosition(token, x, y) {
  const tokens = JSON.parse(storage.getItem('tokens'));
  if (tokens && tokens[token]) {
    tokens[token].position = { x, y };
    storage.setItem('tokens', JSON.stringify(tokens)); 
  }
}

export function getPosition(token) {
  const tokens = JSON.parse(storage.getItem('tokens'));
  return tokens && tokens[token] ? tokens[token].position : null;
}