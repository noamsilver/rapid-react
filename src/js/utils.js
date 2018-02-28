import * as api from './api/apiCalls';

const storage = window.localStorage;
let sessionToken;
syncSessionToken();

function syncSessionToken() {
  let token = JSON.parse(storage.getItem('sessionToken'));
  if (token) {
    token = api.getToken(token.token);
  }
  setSessionToken(token);
}

export function getSessionToken() {
  return sessionToken;
}

function setSessionToken(token) {
  sessionToken = token;
  storage.setItem('sessionToken', JSON.stringify(token));
}

function removeSessionToken() {
  sessionToken = undefined;
  storage.removeItem('sessionToken');
}

function createAccount(username, password) {
  return api.createSessionToken(username, password);
}

export function login(username, password) {
  let token = api.getTokenCredentials(username, password);
  if (!token) { // Auto create account if not found (for simplicity)
    token = createAccount(username, password);
  }
  if (token) {
    setSessionToken(token);
    return true;
  }
  return false;
}

export function logout() {
  removeSessionToken();
}

export function updatePosition(x, y) {
  sessionToken.position.x = x;
  sessionToken.position.y = y;
  api.setPosition(sessionToken.token, x, y);
  setSessionToken(sessionToken);
}