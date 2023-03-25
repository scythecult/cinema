// import CommentsModel from '../model/comments-model';
import { remove, render, replace } from '../framework/render';
import DropdownView from '../view/dropdown-view';
import FilmDetailsControlsView from '../view/film-details-controls-view';
import FilmDetailsView from '../view/film-details-view';
import PopupView from '../view/popup-view';
// import CommentsPresenter from './comments-presenter';

export default class PopupPresenter {
  #dropdownComponent = null;
  #popupComponent = null;
  #filmDetailsComponent = null;
  #filmDetailsControlsComponent = null;
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
  #changeData = null;

  constructor(popupContainer, changeData, handleKeydown) {
    this.#popupContainer = popupContainer;
    this.#changeData = changeData;
    this.#handleKeydown = handleKeydown;
  }

  destroy = () => {
    this.#popupComponent.removeOverflow();
    remove(this.#dropdownComponent);
    remove(this.#popupComponent);
  };

  #handleCloseClick = () => {
    this.destroy();
    document.removeEventListener('keydown', this.#handleKeydown);
  };

  #handleAddToWatchClick = () => {
    this.#changeData({
      ...this.#selectedFilm,
      userDetails: {
        ...this.#selectedFilm.userDetails,
        watchlist: !this.#selectedFilm.userDetails.watchlist,
      },
    });
  };

  #renderPopup = () => {
    const prevDropdownComponent = this.#dropdownComponent;
    const prevPopupComponent = this.#popupComponent;
    const prevFilmDetailsComponent = this.#filmDetailsComponent;

    this.#dropdownComponent = new DropdownView();
    this.#popupComponent = new PopupView();
    this.#filmDetailsComponent = new FilmDetailsView(this.#filmInfo);

    this.#filmDetailsTopContainer = this.#popupComponent.element.querySelector(
      '.film-details__top-container'
    );
    this.#filmDetailsBottomContainer = this.#popupComponent.element.querySelector(
      '.film-details__bottom-container'
    );

    this.#popupComponent.addOverflow();
    this.#popupComponent.setClickHandler(this.#handleCloseClick);

    if (
      prevDropdownComponent === null ||
      prevPopupComponent === null ||
      prevFilmDetailsComponent === null
    ) {
      render(this.#dropdownComponent, this.#popupContainer);
      render(this.#popupComponent, this.#popupContainer);
      render(this.#filmDetailsComponent, this.#filmDetailsTopContainer);

      return;
    }

    if (this.#popupContainer.contains(prevDropdownComponent.element)) {
      replace(this.#dropdownComponent, prevDropdownComponent);
    }

    if (this.#popupContainer.contains(prevPopupComponent.element)) {
      replace(this.#popupComponent, prevPopupComponent);
    }

    if (this.#filmDetailsTopContainer.contains(prevFilmDetailsComponent.element)) {
      replace(this.#filmDetailsComponent, prevFilmDetailsComponent);
    }

    remove(prevDropdownComponent);
    remove(prevPopupComponent);
    remove(prevFilmDetailsComponent);
  };

  #renderFilmDetails = () => {
    const prevFilmDetailsComponent = this.#filmDetailsComponent;

    this.#filmDetailsComponent = new FilmDetailsView(this.#filmInfo);

    if (prevFilmDetailsComponent === null) {
      render(this.#filmDetailsComponent, this.#filmDetailsTopContainer);

      return;
    }

    if (this.#filmDetailsTopContainer.contains(prevFilmDetailsComponent.element)) {
      replace(this.#filmDetailsComponent, prevFilmDetailsComponent);
    }

    remove(prevFilmDetailsComponent);
  };

  #renderDetailsControls = () => {
    const prevDetailsControlsComponent = this.#filmDetailsControlsComponent;

    this.#filmDetailsControlsComponent = new FilmDetailsControlsView(this.#userDetails);
    this.#filmDetailsControlsComponent.setWatchListClickHandler(this.#handleAddToWatchClick);

    if (prevDetailsControlsComponent === null) {
      render(this.#filmDetailsControlsComponent, this.#filmDetailsTopContainer);

      return;
    }

    if (this.#filmDetailsTopContainer.contains(prevDetailsControlsComponent.element)) {
      replace(this.#filmDetailsControlsComponent, prevDetailsControlsComponent);
    }

    remove(prevDetailsControlsComponent);
  };

  init = (selectedFilm = {}) => {
    this.#selectedFilm = selectedFilm;
    this.#filmInfo = this.#selectedFilm.filmInfo;
    this.#filmCommentIds = this.#selectedFilm.comments;
    this.#userDetails = this.#selectedFilm.userDetails;

    this.#renderPopup();
    // this.#renderFilmDetails();
    this.#renderDetailsControls();
    // this.#commentsModel = new CommentsModel();

    // this.#filmDetailsControlsComponent = new FilmDetailsControlsView(this.#userDetails);
    // this.#commentsPresenter = new CommentsPresenter(this.#commentsModel);

    // this.#commentsPresenter.init(this.#filmDetailsBottomContainer, this.#filmCommentIds);

    // return;
  };
}
