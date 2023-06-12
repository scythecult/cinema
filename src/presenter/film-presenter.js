import { Mode, UpdateType, UserActions } from '../const';
import { remove, render, replace } from '../framework/render';
import { getCurrentFilmComments } from '../utils/popup';
import FilmCardView from '../view/film-card-view';
import DetailsView from '../view/film-details-view';

export default class FilmPresenter {
  #detailsContainer = document.body;
  #listContainer = null;
  #film = null;
  #filmComponent = null;
  #detailsComponent = null;

  #changeData = null;
  #adaptedComments = null;

  #scrollPosition = 0;
  #MODE = Mode.DEFAULT;

  constructor({ container, changeData }) {
    this.#listContainer = container;
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

    this.#updateDetailsActions();
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

    this.#updateDetailsActions();
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

    this.#updateDetailsActions();
  };

  #updateDetailsActions = () => {
    if (this.#MODE === Mode.DETAILS) {
      this.#detailsComponent.updateElement({
        ...this.#film,
        scrollPosition: this.#scrollPosition,
      });
    }
  };

  #updateDetailsComments = () => {
    this.#detailsComponent.updateElement({
      ...this.#film,
      comments: this.#adaptedComments,
      scrollPosition: this.#scrollPosition,
    });
  };

  #handleAddComment = (newComment = {}) => {
    this.#updateScrollPosition();
    this.#changeData(UserActions.ADD_COMMENT, UpdateType.PATCH, newComment);
    this.#updateDetailsComments();
  };

  #handleDeleteComment = (commentInfo = {}) => {
    this.#updateScrollPosition();
    this.#changeData(UserActions.DELETE_COMMENT, UpdateType.PATCH, commentInfo);
    this.#updateDetailsComments();
  };

  #renderDetails = () => {
    this.#MODE = Mode.DETAILS;

    this.#detailsComponent = new DetailsView({
      film: this.#film,
      comments: this.#adaptedComments,
      onCloseClick: this.#removeDetails,
      onKeydown: this.#removeDetails,
      onWatchlistClick: this.#handleWatchlistClick,
      onWatchedClick: this.#handleWatchedClick,
      onFavoriteClick: this.#handleFavoriteClick,
      onAddCommentClick: this.#handleAddComment,
      onDeleteCommentClick: this.#handleDeleteComment,
    });

    this.#detailsComponent.addOverflow();
    render(this.#detailsComponent, this.#detailsContainer);
  };

  #removeDetails = () => {
    this.#MODE = Mode.DEFAULT;

    this.#detailsComponent.removeOverflow();
    remove(this.#detailsComponent);
  };

  init = (film, comments) => {
    this.#film = film;
    this.#adaptedComments = getCurrentFilmComments(this.#film.commentIds, comments);

    const prevFilmComponent = this.#filmComponent;

    this.#filmComponent = new FilmCardView({
      film: this.#film,
      onCardClick: this.#renderDetails,
      onWatchlistClick: this.#handleWatchlistClick,
      onWatchedClick: this.#handleWatchedClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    if (prevFilmComponent === null) {
      render(this.#filmComponent, this.#listContainer);

      return;
    }

    replace(this.#filmComponent, prevFilmComponent);
    remove(prevFilmComponent);
  };

  destroy = () => {
    remove(this.#filmComponent);
    remove(this.#detailsComponent);
  };
}
