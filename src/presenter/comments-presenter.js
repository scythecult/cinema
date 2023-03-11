import { render } from '../framework/render';
import FilmCommentView from '../view/film-comment-view';
import FilmCommentsContainerView from '../view/film-comments-view';
import NewCommentFormView from '../view/film-new-comment-form-view';

export default class CommentsPresenter {
  #commentsModel = null;

  #filmCommentsContainer = null;
  #filmCommentsList = null;
  #filmComments = null;
  #newCommentForm = new NewCommentFormView();

  constructor(commentsModel = {}) {
    this.#commentsModel = commentsModel;
    this.commentItems = [...this.#commentsModel.comments];
  }

  getComments = (commentIds = []) => {
    const currentComments = [];

    for (const commentId of commentIds) {
      for (const comment of this.commentItems) {
        if (commentId === comment.id) {
          currentComments.push(comment);
        }
      }
    }

    return currentComments;
  };

  init = (container, commentsIds = []) => {
    this.#filmComments = this.getComments(commentsIds);

    this.#filmCommentsContainer = new FilmCommentsContainerView(commentsIds.length);
    this.#filmCommentsList = this.#filmCommentsContainer.element.querySelector(
      '.film-details__comments-list'
    );

    render(this.#filmCommentsContainer, container);

    for (const comment of this.#filmComments) {
      render(new FilmCommentView(comment), this.#filmCommentsList);
    }

    render(this.#newCommentForm, this.#filmCommentsContainer.element);
  };
}
