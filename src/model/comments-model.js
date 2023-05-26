import Observable from '../framework/observable';
import { COMMENTS } from '../mock/comments';

export default class CommentsModel extends Observable {
  #comments = COMMENTS;

  get comments() {
    return this.#comments;
  }

  addComment(updateType, update) {
    const { film: currentFilm, comment } = update;

    this.#comments = [...this.#comments, comment];

    this._notify(updateType, currentFilm);
  }
}
