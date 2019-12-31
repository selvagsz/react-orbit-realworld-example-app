import React from 'react';
import { useStore } from 'react-orbit';
import AuthorProfile from 'components/ui/AuthorProfile';

function Comment({comment}) {
  const store = useStore();
  const author = store.memory.cache.query((t) => t.findRecord(comment.relationships.author.data));

  return (
    <div className="Comment">
      <div className="Comment__Body">
        <p>{comment.attributes.body}</p>
      </div>
      <div className="Comment__Footer">
        <AuthorProfile
          size="small"
          alignment="horizontal"
          image={author.attributes.image}
          name={author.attributes.username}
          postedAt={comment.attributes.createdAt}
        />
      </div>
    </div>
  );
}

export default Comment;
