import React from 'react';
import AuthorProfile from 'components/ui/AuthorProfile';
import { useStore } from 'react-orbit';

function Hero({article}) {
  const store = useStore();
  const author = store.memory.cache.query((t) => t.findRecord(article.relationships.author.data));

  return (
    <div className="Hero">
      <h1 className="Hero__Title">{article.attributes.title}</h1>
      <AuthorProfile
        image={author.attributes.image}
        name={author.attributes.username}
        postedAt={article.attributes.createdAt}
      />
    </div>
  );
}

export default Hero;
