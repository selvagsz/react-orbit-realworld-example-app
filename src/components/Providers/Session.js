import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';

const SessionContext = React.createContext(null);
const SESSION_KEY = 'REACT_ORBIT_REALWORLD'

function setSessionToken(token) {
  localStorage.setItem(SESSION_KEY, token);
}

function getSessionToken() {
  localStorage.getItem(SESSION_KEY);
}

export default function Session({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const setSession = useCallback((token) => {
    if (token) {
      setSessionToken(token);

      ReactDOM.unstable_batchedUpdates(() => {
        setIsAuthenticated(true);
        setCurrentUser({
          name: 'selva'
        })
      })
    }
  }, []);

  useEffect(() => {
    const token = getSessionToken()
    ReactDOM.unstable_batchedUpdates(() => {
      setIsAuthenticated(!!token);
      setCurrentUser(token ? { name: 'selva' } : null)
    });
  }, []);

  return (
    <SessionContext.Provider value={{isAuthenticated, currentUser, setSession}}>
      {children}
    </SessionContext.Provider>
  )
}
