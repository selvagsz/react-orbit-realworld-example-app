import React from 'react';
import { Link } from '@reach/router';
import Tag from 'components/ui/Tag'
import FavouriteButton from 'components/ui/FavoriteButton'
import AuthorProfile from 'components/ui/AuthorProfile';
import { useStore } from 'react-orbit';

function ArticleItem({ article }) {
  const store = useStore();
  const author = store.memory.cache.query((t) => t.findRecord(article.relationships.author.data))

  return (
    <div className="ArticleListItem">
      <div className="ArticleListItem__Meta">
        <AuthorProfile
          image={author.attributes.image}
          name={author.attributes.username}
          postedAt={article.attributes.createdAt}
        />
        <FavouriteButton favoritesCount={article.attributes.favoritesCount} favorited={article.attributes.favorited} />
      </div>
      <div className="ArticleListItem__Preview">
        <h3 className="ArticleListItem__PreviewHeader">{article.attributes.title}</h3>
        <p className="ArticleListItem__PreviewDescription">{article.attributes.description}</p>

        <div className="ArticleListItem__PreviewFooter">
          <Link to={`/articles/${article.attributes.slug}`} className="ArticleListItem__PreviewReadMore">Read More...</Link>
          <div className="ArticleListItem__PreviewTags">
            {article.attributes.tagList.map((tag) => <Tag key={tag} appearance="outlined" label={tag} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleItem;
