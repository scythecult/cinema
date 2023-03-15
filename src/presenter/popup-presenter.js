import CommentsModel from '../model/comments-model';
import { remove, render } from '../framework/render';
import DropdownView from '../view/dropdown-view';
import FilmDetailsControlsView from '../view/film-details-controls-view';
import FilmDetailsView from '../view/film-details-view';
import PopupView from '../view/popup-view';
import CommentsPresenter from './comments-presenter';

export default class PopupPresenter {
  #dropdown = null;
  #popupComponent = null;
  #popupContainer = null;
  #selectedFilm = null;
  #filmDetailsTopContainer = null;
  #filmDetailsBottomContainer = null;
  #filmInfo = null;
  #filmCommentIds = null;
  #userDetails = null;
  #commentsModel = null;
  #commentsPresenter = null;
  #handleKeydown = null;

  constructor(selectedFilm = {}, handleKeydown) {
    this.#selectedFilm = selectedFilm;
    this.#handleKeydown = handleKeydown;
  }

  destroy = () => {
    remove(this.#dropdown);
    remove(this.#popupComponent);
    this.#popupComponent.removeOverflow();
  };

  #handleCloseClick = () => {
    this.destroy();
    document.removeEventListener('keydown', this.#handleKeydown);
  };

  init = (popupContainer = {}) => {
    this.#popupContainer = popupContainer;
    this.#dropdown = new DropdownView();
    this.#popupComponent = new PopupView();
    this.#filmDetailsTopContainer = this.#popupComponent.element.querySelector(
      '.film-details__top-container'
    );
    this.#filmDetailsBottomContainer = this.#popupComponent.element.querySelector(
      '.film-details__bottom-container'
    );
    this.#commentsModel = new CommentsModel();

    this.#filmInfo = this.#selectedFilm.filmInfo;
    this.#filmCommentIds = this.#selectedFilm.comments;
    this.#userDetails = this.#selectedFilm.userDetails;
    this.#commentsPresenter = new CommentsPresenter(this.#commentsModel);

    render(this.#dropdown, this.#popupContainer);
    render(this.#popupComponent, this.#popupContainer);
    render(new FilmDetailsView(this.#filmInfo), this.#filmDetailsTopContainer);
    render(new FilmDetailsControlsView(this.#userDetails), this.#filmDetailsTopContainer);

    this.#popupComponent.addOverflow();
    this.#popupComponent.setClickHandler(this.#handleCloseClick);
    this.#commentsPresenter.init(this.#filmDetailsBottomContainer, this.#filmCommentIds);
  };
}
