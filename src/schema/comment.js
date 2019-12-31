export default {
  attributes: {
    body: { type: 'string' },
    createdAt: { type: 'date' },
    updatedAt: { type: 'date' },
  },
  relationships: {
    author: { type: 'hasOne', model: 'author' },
  }
};
