import React from 'react';
import Button from 'components/ui/Button'

function AuthorHero({author}) {
  return (
    <div className="Hero">
      <div className="ProfileHero__Details">
        <img className="ProfileHero__Image" src={author.attributes.image} alt=""/>
        <h4 className="ProfileHero__Name">{author.attributes.username}</h4>
      </div>
      <div className="ProfileHero__Actions">
        <Button appearance="outlined" size="small">
          Follow {author.attributes.username}
        </Button>
      </div>
    </div>
  );
}

export default AuthorHero;
