// import { COMMENTS } from '../mock/comments';
import CommentsModel from '../model/comments-model';
import { render } from '../render';
import FilmDetailsControlsView from '../view/film-details-controls-view';
import FilmDetailsView from '../view/film-details-view';
// import FilmCommentView from '../view/film-comment-view';
// import FilmCommentsContainerView from '../view/film-comments-view';
// import FilmDetailsControlsView from '../view/film-details-controls-view';
// import FilmDetailsView from '../view/film-details-view';
// import NewCommentFormView from '../view/film-new-comment-form-view';
import PopupView from '../view/popup-view';
import CommentsPresenter from './comments-presenter';

export default class PopupPresenter {
  #popup = null;
  #popupContainer = null;
  #filmDetailsTopContainer = null;
  #filmDetailsBottomContainer = null;
  #filmInfo = null;
  #filmCommentIds = null;
  #userDetails = null;
  #commentsModel = null;
  #commentsPresenter = null;

  constructor(popupContainer = {}) {
    this.#popupContainer = popupContainer;
  }

  destroy = () => {
    this.#popup.element.remove();
    this.#popup.removeElement();
  };

  init = (selectedFilm = {}) => {
    this.#popup = new PopupView();
    this.#filmDetailsTopContainer = this.#popup.element.querySelector(
      '.film-details__top-container'
    );
    this.#filmDetailsBottomContainer = this.#popup.element.querySelector(
      '.film-details__bottom-container'
    );
    this.#commentsModel = new CommentsModel();

    this.#filmInfo = selectedFilm.filmInfo;
    this.#filmCommentIds = selectedFilm.comments;
    this.#userDetails = selectedFilm.userDetails;
    this.#commentsPresenter = new CommentsPresenter(this.#commentsModel);

    render(this.#popup, this.#popupContainer);
    render(new FilmDetailsView(this.#filmInfo), this.#filmDetailsTopContainer);
    render(new FilmDetailsControlsView(this.#userDetails), this.#filmDetailsTopContainer);
    this.#commentsPresenter.init(this.#filmDetailsBottomContainer, this.#filmCommentIds);
  };
}
