import { remove, render, replace } from '../framework/render';
import FilmCardView from '../view/film-card-view';

export default class FilmPresenter {
  #filmListContainer = null;
  #film = null;
  #filmComponent = null;

  #changeData = null;
  #renderPopup = null;

  constructor({ filmsListContainer, changeData, renderPopup }) {
    this.#filmListContainer = filmsListContainer;
    this.#changeData = changeData;
    this.#renderPopup = renderPopup;
  }

  #handleCardClick = () => {
    this.#renderPopup(this.#film);
  };

  #handleWatchlistClick = () => {
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
      onCardClick: this.#handleCardClick,
      onWatchlistClick: this.#handleWatchlistClick,
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
