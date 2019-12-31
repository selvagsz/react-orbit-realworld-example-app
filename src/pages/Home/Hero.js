import React from 'react';
import Logo from 'components/ui/Logo';

function Hero() {
  return (
    <div className="Hero">
      <Logo appearance="white" size="large" />
      <p className="Hero__Description">A place to share your knowledge.</p>
    </div>
  );
}

export default Hero;
