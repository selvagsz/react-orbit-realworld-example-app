import React, { useRef } from 'react';
import ArticlesList from 'components/Articles/List';

function MyArticles({username}) {
  const filter = useRef({});
  filter.current.author = username;
  return <ArticlesList filter={filter.current} />;
}

export default MyArticles;
