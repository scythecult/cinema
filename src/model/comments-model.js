import { COMMENTS } from '../mock/comments';

export default class CommentsModel {
  #comments = COMMENTS;

  get comments() {
    return this.#comments;
  }
}
