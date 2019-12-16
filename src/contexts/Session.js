import React from 'react';

const SESSION_KEY = 'REACT_ORBIT_REALWORLD'

export function getSession() {
  return localStorage.getItem(SESSION_KEY);
}

export function setSession(token) {
  return localStorage.setItem(SESSION_KEY, token);
}

export function removeSession() {
  return localStorage.removeItem(SESSION_KEY);
}

const SessionContext = React.createContext(null);

export default SessionContext;
