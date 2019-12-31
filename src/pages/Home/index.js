import React from 'react';
import ArticlesList from 'components/Articles/List';
import Hero from './Hero';
import HomePageNavs from './Navs'
import PopularTags from './PopularTags'
import { Link } from '@reach/router';

const Pagination = ({ perPage = 25, totalCount, children }) => {
  let pages = [];
  if (totalCount && totalCount > perPage) {
    let noOfPages = Math.ceil(totalCount / perPage);
    pages = Array.from(Array(noOfPages)).map((_, num) => ++num);
  }
  if (!pages.length) {
    return null;
  }

  return (
    <nav className="Pagination">
      {pages.map((page) => children(page))}
    </nav>
  )
}

function HomePage() {
  const urlSearchParams = new URLSearchParams(window.location.search)
  const page = urlSearchParams.get('page') || 1;

  return (
    <div className="HomePage">
      <div className="HomePage__Hero">
        <Hero />
      </div>
      <main className="HomePage__Content">
        <div className="HomePage__ListContainer">
          <HomePageNavs />
          <ArticlesList page={page} />
          <Pagination totalCount={500}>
            {(page) => (
              <Link to={`?page=${page}`}>{page}</Link>
            )}
          </Pagination>
        </div>
        <div className="HomePage__TagsContainer">
          <PopularTags />
        </div>
      </main>
    </div>
  );
}

export default HomePage;
