import { remove, render, replace } from '../framework/render';
import FilmCardView from '../view/film-card-view';
// import PopupPresenter from './popup-presenter';

export default class FilmPresenter {
  // #popupPresenter = new Map();

  #popupContainer = document.body;
  #filmListContainer = null;
  #film = null;
  #filmComponent = null;

  #changeData = null;

  constructor({ filmsListContainer, changeData }) {
    this.#filmListContainer = filmsListContainer;
    this.#changeData = changeData;
  }

  // #renderPopup = (film = {}) => {
  //   const popupPresenter = new PopupPresenter(
  //     this.#popupContainer,
  //     this.#changePopupData,
  //     this.#handleKeydown
  //   );

  //   popupPresenter.init(film);
  //   this.#popupPresenter.set(film.id, popupPresenter);
  // };

  // #changePopupData = (updatedFilm) => {
  //   this.#changeData(updatedFilm);

  //   this.#popupPresenter.get(updatedFilm.id).init(updatedFilm);
  // };

  // #removePopup = () => {
  //   this.#popupPresenter.forEach((presenter) => presenter.destroy());
  //   this.#popupPresenter.clear();
  // };

  #handleKeydown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();

      // this.#removePopup();
      document.removeEventListener('keydown', this.#handleKeydown);
    }
  };

  #handleClick = () => {
    // this.#renderPopup(this.#film);
    document.addEventListener('keydown', this.#handleKeydown);
  };

  #handleAddToWatchClick = () => {
    this.#changeData({
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        watchlist: !this.#film.userDetails.watchlist,
      },
    });
  };

  #handleWatchedClick = () => {
    this.#changeData({
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        alreadyWatched: !this.#film.userDetails.alreadyWatched,
      },
    });
  };

  #handleFavoriteClick = () => {
    this.#changeData({
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        favorite: !this.#film.userDetails.favorite,
      },
    });
  };

  init = (film) => {
    this.#film = film;

    const prevFilmComponent = this.#filmComponent;
    this.#filmComponent = new FilmCardView({
      film: this.#film,
      onCardClick: this.#handleClick,
      onWatchListClick: this.#handleAddToWatchClick,
      onWatchedClick: this.#handleWatchedClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    if (prevFilmComponent === null) {
      render(this.#filmComponent, this.#filmListContainer);

      return;
    }

    if (this.#filmListContainer.contains(prevFilmComponent.element)) {
      replace(this.#filmComponent, prevFilmComponent);
    }

    remove(prevFilmComponent);
  };

  destroy = () => {
    remove(this.#filmComponent);
  };
}
