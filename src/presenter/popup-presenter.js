import { COMMENT_ITEMS } from '../model/comments-model';
import { render } from '../render';
import FilmCommentView from '../view/film-comment-view';
import FilmCommentsContainerView from '../view/film-comments-view';
import FilmDetailsControlsView from '../view/film-details-controls-view';
import FilmDetailsView from '../view/film-details-view';
import NewCommentFormView from '../view/film-new-comment-form-view';
import PopupView from '../view/popup-view';

export default class PopupPresenter {
  constructor() {
    this.commentsChildren = {
      comments: this.getComments(),
      newCommentForm: new NewCommentFormView().getTemplate(),
    };
    this.children = {
      filmDetails: new FilmDetailsView().getTemplate(),
      detailsControls: new FilmDetailsControlsView().getTemplate(),
      commentsContainer: new FilmCommentsContainerView(this.commentsChildren).getTemplate(),
    };
  }

  getComments() {
    return COMMENT_ITEMS.map((comment) => new FilmCommentView(comment).getTemplate());
  }

  init(container) {
    render(new PopupView(this.children), container);
  }
}
