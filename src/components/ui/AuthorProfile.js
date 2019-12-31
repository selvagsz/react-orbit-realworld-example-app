import React from 'react';
import classnames from 'classnames';

const SIZES = {
  default: 'AuthorProfile--medium',
  small: 'AuthorProfile--small',
};

const ALIGNMENTS = {
  default: 'AuthorProfile--vertical',
  horizontal: 'AuthorProfile--horizontal',
};

function AuthorProfile({size = 'default', alignment = 'default', image, name, postedAt}) {
  return (
    <div className={classnames('AuthorProfile', SIZES[size], ALIGNMENTS[alignment])}>
      <img className="AuthorProfile__Image" src={image} alt="profile" />
      <div className="AuthorProfile__Details">
        <a className="AuthorProfile__Name">{name}</a>
        <div className="AuthorProfile__Other">{postedAt.toLocaleDateString()}</div>
      </div>
    </div>
  );
}

export default AuthorProfile;
