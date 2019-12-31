import React from 'react';
import classnames from 'classnames';

const APPEARANCE_MAP = {
  default: 'Button--default',
  outlined: 'Button--outlined',
  naked: 'Button--naked',
};

const SIZE_MAP = {
  medium: 'Button--medium',
  small: 'Button--small',
  large: 'Button--large',
};

function Button({appearance = 'default', size = 'medium', children, ...otherProps}) {
  return (
    <button className={classnames('Button', APPEARANCE_MAP[appearance], SIZE_MAP[size])} {...otherProps}>
      {children}
    </button>
  );
}

export default Button;
