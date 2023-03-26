import { remove, render, replace } from '../framework/render';
import PopupView from '../view/popup-view';

export default class PopupPresenter {
  #popupContainer = null;
  #popupComponent = null;

  #film = null;
  #comments = null;
  #currentFilmComments = null;

  #changeData = null;

  constructor({ popupContainer, changeData, comments }) {
    this.#popupContainer = popupContainer;
    this.#changeData = changeData;
    this.#comments = comments;
  }

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

  #getCurrentFilmComments = () => {
    const result = [];
    const commentIdStore = {};

    for (const commentId of this.#film.comments) {
      if (commentIdStore[commentId]) {
        commentIdStore[commentId]++;
      } else {
        commentIdStore[commentId] = 1;
      }
    }

    for (const comment of this.#comments) {
      if (commentIdStore[comment.id]) {
        result.push(comment);
      }
    }

    return result;
  };

  #handleCloseClick = () => {
    this.destroy();
  };

  #handleKeydown = () => {
    this.destroy();
  };

  init = (film = {}) => {
    this.#film = film;
    this.#currentFilmComments = this.#getCurrentFilmComments();

    const prevPopupComponent = this.#popupComponent;

    this.#popupComponent = new PopupView({
      film: this.#film,
      comments: this.#currentFilmComments,
      onCloseClick: this.#handleCloseClick,
      onKeydown: this.#handleKeydown,
      onWatchlistClick: this.#handleWatchlistClick,
      onWatchedClick: this.#handleWatchedClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    if (prevPopupComponent === null) {
      render(this.#popupComponent, this.#popupContainer);

      return;
    }

    if (this.#popupContainer.contains(prevPopupComponent.element)) {
      replace(this.#popupComponent, prevPopupComponent);
    }

    remove(prevPopupComponent);
  };

  destroy = () => {
    this.#popupComponent.removeOverflow();
    remove(this.#popupComponent);
  };
}
