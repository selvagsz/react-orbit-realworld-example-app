import React, {useEffect} from 'react';
import { Router } from "@reach/router"
import { Link } from '@reach/router';
import { useQuery } from 'react-orbit';
import ProfileHero from './Hero';
import MyArticles from './MyArticles';
import FavoritedArticles from './FavoritedArticles';

function Profile({username}) {
  const {data: author = {}, query} = useQuery();

  useEffect(() => {
    query((t) => t.findRecord({type: 'author', id: username}));
  }, [query, username]);

  return (
    <div className="ProfilePage">
      {author.attributes ? (
        <>
          <div className="ProfilePage__Hero">
            <ProfileHero author={author} />
          </div>
          <div className="ProfilePage__Content">
            <nav className="HomePage__Navs">
              <Link to="./">My Articles</Link>
              <Link to="favorites">Favorited Articles</Link>
            </nav>
            <Router>
              <MyArticles path="/" />
              <FavoritedArticles path="favorites" />
            </Router>
          </div>
        </>
      ) : (
        'loading...'
      )}
    </div>
  );
}

export default Profile;
