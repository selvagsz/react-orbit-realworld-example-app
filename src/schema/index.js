import { Schema } from '@orbit/data';
import ArticleSchema from './article';
import AuthorSchema from './author';
import CommentSchema from './comment';

export default new Schema({
  models: {
    article: ArticleSchema,
    author: AuthorSchema,
    comment: CommentSchema,
  },
});
