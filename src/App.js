import React from 'react';
import { Router } from "@reach/router"
import MemorySource from '@orbit/memory';
import RESTSource from 'orbit/rest-source/source';
import { RequestStrategy, SyncStrategy } from '@orbit/coordinator';
import { KeyMap } from '@orbit/data';
import { ReactOrbitProvider } from 'react-orbit';
import schema from 'schema'
import SessionProvider from 'components/Providers/Session'
import Header from 'components/Layout/Header';
import Home from 'pages/Home';
import Article from 'pages/Article';
import Profile from 'pages/Profile';

const keyMap = new KeyMap();

function App() {
  return (
    <ReactOrbitProvider
      memorySource={
        new MemorySource({
          schema,
          keyMap,
          name: 'memory',
        })
      }
      remoteSource={
        new RESTSource({
          schema,
          keyMap,
          name: 'remote',
          host: 'https://conduit.productionready.io',
          namespace: 'api',
          defaultFetchTimeout: 10000000
        })
      }
      addStrategies={(coordinator) => {
        // Query the remote server whenever the memory source is queried
        coordinator.addStrategy(
          new RequestStrategy({
            source: 'memory',
            on: 'beforeQuery',
            target: 'remote',
            action: 'query',
            blocking: false,
          })
        );

        // Update the remote server whenever the memory source is updated
        coordinator.addStrategy(
          new RequestStrategy({
            source: 'memory',
            on: 'beforeUpdate',
            target: 'remote',
            action: 'update',
            blocking: false,
          })
        );

        // Sync all changes received from the remote server to the memory source
        coordinator.addStrategy(
          new SyncStrategy({
            source: 'remote',
            target: 'memory',
            blocking: false,
          })
        );
      }}
    >
      <SessionProvider>
        <div className="App">
          <Header />

          <Router>
            <Home path="/" />
            <Article path="/articles/:slug" />
            <Profile path="/profile/:username/*" />
          </Router>
        </div>
      </SessionProvider>
    </ReactOrbitProvider>
  );
}

export default App;
