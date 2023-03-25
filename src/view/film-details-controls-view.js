import AbstractView from '../framework/view/abstract-view';

const createFilmDetailsControlsTemplate = (props = {}) => {
  const { watchlist, alreadyWatched, favorite } = props;
  const watchListClass = watchlist ? 'film-details__control-button--active' : '';
  const alreadyWatchedClass = alreadyWatched ? 'film-details__control-button--active' : '';
  const favoritesClass = favorite ? 'film-details__control-button--active' : '';

  return `
<section class="film-details__controls">
  <button type="button" class="${watchListClass} film-details__control-button film-details__control-button--watchlist" id="watchlist" name="watchlist">Add to watchlist</button>
  <button type="button" class="${alreadyWatchedClass} film-details__control-button film-details__control-button--watched" id="watched" name="watched">Already watched</button>
  <button type="button" class="${favoritesClass} film-details__control-button film-details__control-button--favorite" id="favorite" name="favorite">Add to favorites</button>
</section>`;
};

export default class FilmDetailsControlsView extends AbstractView {
  #props = null;

  constructor(props = {}) {
    super();
    this.#props = props;
  }

  get template() {
    return createFilmDetailsControlsTemplate(this.#props);
  }

  setWatchListClickHandler = (callback = () => {}) => {
    const addToWatchButton = this.element.querySelector('#watchlist');

    this._callback.addToWatchlistClick = callback;
    addToWatchButton.addEventListener('click', this.#addToWatchedClick);
  };

  setWatchedClickHandler = (callback = () => {}) => {
    const watchedButton = this.element.querySelector('.film-card__controls-item--mark-as-watched');

    this._callback.addToWatchedClick = callback;
    watchedButton.addEventListener('click', this.#addToWatchedClick);
  };

  setFavoriteClickHandler = (callback = () => {}) => {
    const favoriteButton = this.element.querySelector('.film-card__controls-item--favorite');

    this._callback.addToFavoriteClick = callback;
    favoriteButton.addEventListener('click', this.#addToFavoriteClick);
  };

  #addToWatchedClick = () => {
    this._callback.addToWatchlistClick();
  };

  #addToWatchlistClick = () => {
    this._callback.addToWatchlistClick();
  };

  #addToFavoriteClick = () => {
    this._callback.addToFavoriteClick();
  };
}
