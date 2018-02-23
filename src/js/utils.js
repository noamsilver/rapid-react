import * as api from './api/apiCalls';

var storage = window.localStorage;

export function getSessionToken() {
  return JSON.parse(storage.getItem('sessionToken'));
}

function setSessionToken(sessionToken) {
  storage.setItem('sessionToken', JSON.stringify(sessionToken));
}

function removeSessionToken() {
  storage.removeItem('sessionToken');
}

function createAccount(username, password) {
  return api.createSessionToken(username, password);
}

export function login(username, password) {
  let token = api.getToken(username, password);
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