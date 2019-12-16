import React from 'react';
import classnames from 'classnames';

const SIZE_MAP = {
  default: 'Logo--medium',
  large: 'Logo--large',
};

const APPEARANCE_MAP = {
  primary: 'Logo--primary',
  white: 'Logo--white',
};

function Logo({size = 'default', appearance = 'primary'}) {
  return <span className={classnames('Logo', SIZE_MAP[size], APPEARANCE_MAP[appearance])}>conduit</span>;
}

export default Logo;
