import React, {useEffect} from 'react';
import { useQuery } from 'react-orbit';
import ArticleListItem from './ArticleItem';

const PER_PAGE = 25;

function ArticlesList({page = 1, tag, filter = {}}) {
  const {data: articles = [], query} = useQuery();

  useEffect(() => {
    const filters = Object.keys(filter).reduce((filterAttributes, filterKey) => {
      const filterAttribute = {attribute: filterKey, value: filter[filterKey]};
      filterAttributes.push(filterAttribute);
      return filterAttributes;
    }, []);

    query((t) =>
      t
        .findRecords('article')
        .sort('-createdAt')
        .page({
          offset: (page - 1) * PER_PAGE,
          limit: PER_PAGE,
        })
        .filter(...filters)
    );
  }, [query, page, filter.author, filter.favorited]);

  return (
    <div className="ArticlesList">
      {articles.map((article) => {
        return <ArticleListItem key={article.attributes.slug} article={article} />;
      })}
    </div>
  );
}

export default ArticlesList;
