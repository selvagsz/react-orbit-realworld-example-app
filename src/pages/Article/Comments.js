import React, {useEffect} from 'react';
import { useQuery } from 'react-orbit';
import Comment from './Comment';

function Comments({article}) {
  const {data: comments = [], query} = useQuery();

  useEffect(() => {
    query((t) =>
      t.findRelatedRecords(
        {
          type: article.type,
          id: article.id,
        },
        'comments'
      )
    );
  }, [query, article.type, article.id]);

  return (
    <>
      <p>
        <a href="/login">Sign in</a> or <a href="/register">sign up</a> to add comments on this article.
      </p>
      <div className="Comments">
        {comments.map((comment) => {
          return <Comment key={comment.id} comment={comment} />;
        })}
      </div>
    </>
  );
}

export default Comments;
