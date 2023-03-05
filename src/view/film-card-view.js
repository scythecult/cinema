import { createElement } from '../render';
import { formatDate, formatDuration } from '../utils';

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
  const { id, comments = [] } = props;
  const { alreadyWatched = false, favorite = false, watchlist = false } = props.userDetails;

  const watchListClass = watchlist ? 'film-card__controls-item--active' : '';
  const alreadyWatchedClass = alreadyWatched ? 'film-card__controls-item--active' : '';
  const favoritesClass = favorite ? 'film-card__controls-item--active' : '';
  const genres = genre.join(', ');
  const duration = formatDuration(runtime);
  const releaseYear = formatDate(date);

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
    <p class="film-card__description">${description}</p>
    <span class="film-card__comments">${comments?.length} comments</span>
  </a>
  <div class="film-card__controls">
    <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${watchListClass}" type="button">Add to watchlist</button>
    <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${alreadyWatchedClass}" type="button">Mark as watched</button>
    <button class="film-card__controls-item film-card__controls-item--favorite ${favoritesClass}" type="button">Mark as favorite</button>
  </div>
  </article>`;
};

export default class FilmCardView {
  #element = null;
  #props = null;

  constructor(props = {}) {
    this.#props = props;
  }

  get template() {
    return createFilmCardTemplate(this.#props);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
