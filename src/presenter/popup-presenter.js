import CommentsModel from '../model/comments-model';
import { render } from '../framework/render';
import DropdownView from '../view/dropdown-view';
import FilmDetailsControlsView from '../view/film-details-controls-view';
import FilmDetailsView from '../view/film-details-view';
import PopupView from '../view/popup-view';
import CommentsPresenter from './comments-presenter';

export default class PopupPresenter {
  #dropdown = null;
  #popup = null;
  #popupContainer = null;
  #selectedFilm = null;
  #filmDetailsTopContainer = null;
  #filmDetailsBottomContainer = null;
  #filmInfo = null;
  #filmCommentIds = null;
  #userDetails = null;
  #commentsModel = null;
  #commentsPresenter = null;

  constructor(selectedFilm = {}) {
    this.#selectedFilm = selectedFilm;
  }

  destroy = () => {
    this.#dropdown.element.remove();
    this.#dropdown.removeElement();
    this.#popup.element.remove();
    this.#popup.removeElement();
  };

  init = (popupContainer = {}) => {
    this.#popupContainer = popupContainer;
    this.#dropdown = new DropdownView();
    this.#popup = new PopupView();
    this.#filmDetailsTopContainer = this.#popup.element.querySelector(
      '.film-details__top-container'
    );
    this.#filmDetailsBottomContainer = this.#popup.element.querySelector(
      '.film-details__bottom-container'
    );
    this.#commentsModel = new CommentsModel();

    this.#filmInfo = this.#selectedFilm.filmInfo;
    this.#filmCommentIds = this.#selectedFilm.comments;
    this.#userDetails = this.#selectedFilm.userDetails;
    this.#commentsPresenter = new CommentsPresenter(this.#commentsModel);

    render(this.#dropdown, this.#popupContainer);
    render(this.#popup, this.#popupContainer);
    render(new FilmDetailsView(this.#filmInfo), this.#filmDetailsTopContainer);
    render(new FilmDetailsControlsView(this.#userDetails), this.#filmDetailsTopContainer);
    this.#commentsPresenter.init(this.#filmDetailsBottomContainer, this.#filmCommentIds);
  };
}
