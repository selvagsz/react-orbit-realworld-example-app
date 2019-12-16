import React, { useContext } from 'react';
import Logo from '../components/ui/Logo'
import SessionContext from '../contexts/Session';

function Home() {
  const session = useContext(SessionContext)

  return (
    <>
      <div className="Hero">
        <Logo appearance="white" size="large" />
        <p className="Hero__Description">A place to share your knowledge.</p>
      </div>
      <main>
        <h1>Main Content</h1>
        {session.isAuthenticated ? session.currentUser.name : 'logged out'}
      </main>
    </>
  );
}

export default Home;
