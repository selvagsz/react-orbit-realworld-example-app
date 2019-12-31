import React, { useRef } from 'react';
import ArticlesList from 'components/Articles/List';

function FavoritedArticles({ username }) {
  const filter = useRef({});
  filter.current.favorited = username;
  return (
    <ArticlesList filter={filter.current} />
  );
}

export default FavoritedArticles;
