import { createElement } from '../render';

const createFilmCardTemplate = ({
  title = '',
  rating = '3.2',
  year = '',
  duration = '',
  genre = '',
  imageSrc = '',
  description = '',
  commentsCount = '',
} = {}) => `<article class="film-card">
<a class="film-card__link">
  <h3 class="film-card__title">${title}</h3>
  <p class="film-card__rating">${rating}</p>
  <p class="film-card__info">
    <span class="film-card__year">${year}</span>
    <span class="film-card__duration">${duration}</span>
    <span class="film-card__genre">${genre}</span>
  </p>
  <img src="${imageSrc}" alt="${title}" class="film-card__poster">
  <p class="film-card__description">${description}</p>
  <span class="film-card__comments">${commentsCount} comments</span>
</a>
<div class="film-card__controls">
  <button class="film-card__controls-item film-card__controls-item--add-to-watchlist film-card__controls-item--active" type="button">Add to watchlist</button>
  <button class="film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
  <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
</div>
</article>`;

export default class FilmCardView {
  constructor(props = {}) {
    this.props = props;
  }

  getTemplate() {
    return createFilmCardTemplate(this.props);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
