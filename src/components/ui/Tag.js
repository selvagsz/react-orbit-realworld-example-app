import React from 'react';
import classnames from 'classnames';

const APPEARANCE_MAP = {
  default: 'Tag--default',
  outlined: 'Tag--outlined',
};

function Tag({appearance = 'default', label}) {
  return <span className={classnames('Tag', APPEARANCE_MAP[appearance])}>{label}</span>;
}

export default Tag;
