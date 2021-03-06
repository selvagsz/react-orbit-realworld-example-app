export default {
  attributes: {
    title: { type: 'string' },
    slug: { type: 'string' },
    body: { type: 'string' },
    createdAt: { type: 'datetime' },
    updatedAt: { type: 'datetime' },
    description: { type: 'string' },
    tagList: { type: 'raw' },
    favorited: { type: 'boolean' },
    favoritesCount: { type: 'number' },
  },
  relationships: {
    author: { type: 'hasOne', model: 'author' },
    comments: { type: 'hasMany', model: 'comment' }
  }
};
