import React from 'react';
import classnames from 'classnames';

function FavoriteButton({favoritesCount = 0, favorited = false}) {
  return (
    <button className={classnames('FavoriteButton', favorited && 'FavoriteButton--fill')}>
      <i className="ion-heart"></i>
      {favoritesCount}
    </button>
  );
}

export default FavoriteButton;
