import React from 'react';
import Header from './components/Layout/Header';
import { Router } from "@reach/router"
import SessionProvider from './components/Providers/Session'
import Home from './pages/Home';

function App() {
  return (
    <SessionProvider>
      <div className="App">
        <Header />

        <Router>
          <Home path="/" />
        </Router>
      </div>
    </SessionProvider>
  );
}

export default App;
