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
  #comments = null;
  #commentsModel = null;

  #scrollPosition = 0;
  #MODE = Mode.DEFAULT;

  constructor({ container, changeData, commentsModel }) {
    this.#listContainer = container;
    this.#changeData = changeData;
    this.#commentsModel = commentsModel;
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

  #updateDetails = async () => {
    this.#comments = await this.#commentsModel.init(this.#film.id);

    this.#detailsComponent.updateElement({
      ...this.#film,
      comments: this.#comments,
      scrollPosition: this.#scrollPosition,
    });

    this.#detailsComponent.setScrollPosition(this.#scrollPosition);
    this.#detailsComponent.markEmojiAsChecked();
  };

  #handleAddComment = (newComment = {}) => {
    this.#updateScrollPosition();
    this.#changeData(UserActions.ADD_COMMENT, UpdateType.PATCH, newComment);
  };

  #handleDeleteComment = (commentInfo = {}) => {
    this.#updateScrollPosition();
    this.#changeData(UserActions.DELETE_COMMENT, UpdateType.PATCH, commentInfo);
  };

  #renderDetails = async () => {
    this.#comments = await this.#commentsModel.init(this.#film.id);
    this.#MODE = Mode.DETAILS;

    this.#detailsComponent = new DetailsView({
      film: this.#film,
      comments: this.#comments,
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

  init = (film) => {
    this.#film = film;

    if (this.#MODE === Mode.DETAILS) {
      this.#updateDetails();
    }

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
