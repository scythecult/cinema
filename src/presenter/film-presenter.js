import { Mode, UpdateType, UserActions } from '../const';
import { remove, render, replace } from '../framework/render';
import FilmCardView from '../view/film-card-view';
import DetailsView from '../view/film-details-view';

export default class FilmPresenter {
  #detailsContainer = document.body;
  #listContainer = null;
  #film = null;
  #filmComponent = null;
  #detailsComponent = null;

  #changeData = null;

  #scrollPosition = 0;
  #MODE = Mode.DEFAULT;

  constructor({ filmsListContainer, changeData }) {
    this.#listContainer = filmsListContainer;
    this.#changeData = changeData;
  }

  #updateScrollPosition = () => {
    if (this.#MODE === Mode.DETAILS) {
      this.#scrollPosition = this.#detailsComponent.getScrollPosition();
    }
  };

  #handleWatchlistClick = () => {
    this.#updateScrollPosition();

    this.#changeData(UserActions.UPDATE, UpdateType.PATCH, {
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        watchlist: !this.#film.userDetails.watchlist,
      },
    });
  };

  #handleWatchedClick = () => {
    this.#updateScrollPosition();

    this.#changeData(UserActions.UPDATE, UpdateType.PATCH, {
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        alreadyWatched: !this.#film.userDetails.alreadyWatched,
      },
    });
  };

  #handleFavoriteClick = () => {
    this.#updateScrollPosition();

    this.#changeData(UserActions.UPDATE, UpdateType.PATCH, {
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        favorite: !this.#film.userDetails.favorite,
      },
    });
  };

  #renderDetails = () => {
    this.#MODE = Mode.DETAILS;

    this.#detailsComponent = new DetailsView({
      film: this.#film,
      scrollPosition: this.#scrollPosition,
      onCloseClick: this.#removeDetails,
      onKeydown: this.#removeDetails,
      onWatchlistClick: this.#handleWatchlistClick,
      onWatchedClick: this.#handleWatchedClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#detailsComponent.addOverflow();
    render(this.#detailsComponent, this.#detailsContainer);
  };

  #removeDetails = () => {
    this.#MODE = Mode.DEFAULT;

    this.#detailsComponent.removeOverflow();
    remove(this.#detailsComponent);
  };

  init = (film) => {
    this.#film = film;

    const prevFilmComponent = this.#filmComponent;
    const prevDetailsComponent = this.#detailsComponent;

    this.#filmComponent = new FilmCardView({
      film: this.#film,
      onCardClick: this.#renderDetails,
      onWatchlistClick: this.#handleWatchlistClick,
      onWatchedClick: this.#handleWatchedClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#detailsComponent = new DetailsView({
      film: this.#film,
      scrollPosition: this.#scrollPosition,
      onCloseClick: this.#removeDetails,
      onKeydown: this.#removeDetails,
      onWatchlistClick: this.#handleWatchlistClick,
      onWatchedClick: this.#handleWatchedClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    if (prevFilmComponent === null || prevDetailsComponent === null) {
      render(this.#filmComponent, this.#listContainer);

      return;
    }

    if (this.#MODE === Mode.DETAILS) {
      render(this.#detailsComponent, this.#detailsContainer);
    }

    replace(this.#filmComponent, prevFilmComponent);
    remove(prevFilmComponent);
    remove(prevDetailsComponent);
  };

  destroy = () => {
    remove(this.#filmComponent);
    remove(this.#detailsComponent);
  };
}
