import AbstractView from '../framework/view/abstract-view';
import { formatDate, formatDuration, truncate } from '../utils/film';

const createFilmCardTemplate = (props = {}) => {
  const {
    title = '',
    totalRating = '',
    release: { date = '' },
    runtime = '',
    genre = [],
    poster = '',
    description = '',
  } = props.filmInfo;
  const { id, commentIds = [] } = props;
  const { alreadyWatched = false, favorite = false, watchlist = false } = props.userDetails;

  const watchListClass = watchlist ? 'film-card__controls-item--active' : '';
  const alreadyWatchedClass = alreadyWatched ? 'film-card__controls-item--active' : '';
  const favoritesClass = favorite ? 'film-card__controls-item--active' : '';
  const genres = genre.join(', ');
  const duration = formatDuration(runtime);
  const releaseYear = formatDate(date);
  const truncatedDescr = truncate(description);

  return `<article class="film-card" data-film-id='${id}'>
  <a class="film-card__link">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${totalRating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${releaseYear}</span>
      <span class="film-card__duration">${duration}</span>
      <span class="film-card__genre">${genres}</span>
    </p>
    <img src="${poster}" alt="${title}" class="film-card__poster">
    <p class="film-card__description">${truncatedDescr}</p>
    <span class="film-card__comments">${commentIds?.length} comments</span>
  </a>
  <div class="film-card__controls">
    <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${watchListClass}" type="button">Add to watchlist</button>
    <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${alreadyWatchedClass}" type="button">Mark as watched</button>
    <button class="film-card__controls-item film-card__controls-item--favorite ${favoritesClass}" type="button">Mark as favorite</button>
  </div>
  </article>`;
};

export default class FilmCardView extends AbstractView {
  #film = null;
  #handleCardClick = null;
  #handleWatchlistClick = null;
  #handleWatchedClick = null;
  #handleFavoriteClick = null;

  constructor({ film, onCardClick = () => {}, onWatchlistClick, onWatchedClick, onFavoriteClick } = {}) {
    super();
    this.#film = film;
    this.#handleCardClick = onCardClick;
    this.#handleWatchlistClick = onWatchlistClick;
    this.#handleWatchedClick = onWatchedClick;
    this.#handleFavoriteClick = onFavoriteClick;

    this.#setInnerHandlers();
  }

  get template() {
    return createFilmCardTemplate(this.#film);
  }

  #setInnerHandlers = () => {
    this.element.addEventListener('click', this.#clickHandler);
    this.element
      .querySelector('.film-card__controls-item--add-to-watchlist')
      .addEventListener('click', this.#addToWatchlistClick);
    this.element
      .querySelector('.film-card__controls-item--mark-as-watched')
      .addEventListener('click', this.#addToWatchedClick);
    this.element
      .querySelector('.film-card__controls-item--favorite')
      .addEventListener('click', this.#addToFavoriteClick);
  };

  #addToWatchedClick = (evt) => {
    evt.preventDefault();
    this.#handleWatchedClick();
  };

  #addToWatchlistClick = (evt) => {
    evt.preventDefault();
    this.#handleWatchlistClick();
  };

  #addToFavoriteClick = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick();
  };

  #clickHandler = (evt) => {
    if (evt.target.closest('.film-card__link')) {
      this.#handleCardClick();
    }
  };
}
