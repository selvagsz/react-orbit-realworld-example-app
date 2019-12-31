import React from 'react';
import Tag from 'components/ui/Tag';

function PopularTags() {
  return (
    <div className="PopularTags">
      <h3 className="PopularTags__Header">Popular Tags</h3>
      <ul className="PopularTags__List">
        <li>
          <Tag label="foo" />
        </li>
        <li>
          <Tag label="foo" />
        </li>
        <li>
          <Tag label="foo" />
        </li>
      </ul>
    </div>
  );
}

export default PopularTags;
