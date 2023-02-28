import { createElement } from '../render';

const createFilmDetailsControlsTemplate = (props) => {
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

export default class FilmDetailsControlsView {
  constructor(props) {
    this.props = props;
  }

  getTemplate() {
    return createFilmDetailsControlsTemplate(this.props);
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
