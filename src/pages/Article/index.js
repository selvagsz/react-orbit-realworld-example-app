import React, {useEffect} from 'react';
import { useQuery } from 'react-orbit';
import marked from 'marked';
import Tag from 'components/ui/Tag';
import ArticleHero from './Hero';
import ArticleComments from './Comments';

function Article({slug}) {
  const {data: article = {}, query} = useQuery();

  useEffect(() => {
    query((t) => t.findRecord({type: 'article', id: slug}));
  }, [query, slug]);

  return (
    <div className="ArticlePage">
      {article.attributes ? (
        <>
          <div className="ArticlePage__Hero">
            <ArticleHero article={article} />
          </div>
          <div className="ArticlePage__Content">
            <article dangerouslySetInnerHTML={{__html: marked(article.attributes.body)}}></article>
            {article.attributes.tagList.map((tag) => (
              <Tag key={tag} appearance="outlined" label={tag} />
            ))}
            <hr />
          </div>
          <div className="ArticlePage__Actions">

          </div>
          <div className="ArticlePage__Comments">
            <ArticleComments article={article} />
          </div>
        </>
      ) : (
        'loading...'
      )}
    </div>
  );
}

export default Article;
