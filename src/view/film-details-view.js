import { createElement } from '../render';

const createFilmDetailsTemplate = (props = {}) => {
  const {
    poster = './images/posters/the-great-flamarion.jpg',
    title = 'The Great Flamarion',
    alternativeTitle = '',
    totalRating = '8.9',
    director = 'Anthony Mann',
    writers = ['Anne Wigton', 'Heinz Herald', 'Richard Weil'],
    actors = ['Erich von Stroheim', 'Mary Beth Hughes', 'Dan Duryea'],
    releaseDate = '30 March 1945',
    duration = '1h 18m',
    country = 'USA',
    genres = ['Drama', 'Film-Noir', 'Mystery'],
    description = 'The film opens following a murder at a cabaret in Mexico City in 1936, and then presents the events leading up to it in flashback. The Great Flamarion (Erich von Stroheim) is an arrogant, friendless, and misogynous marksman who displays his trick gunshot act in the vaudeville circuit. His show features a beautiful assistant, Connie (Mary Beth Hughes) and her drunken husband Al (Dan Duryea), Flamarions other assistant. Flamarion falls in love with Connie, the movies femme fatale, and is soon manipulated by her into killing her no good husband during one of their acts.',
    age = '18+',
  } = props;
  const genreElements = genres.map((genre) => `<span class="film-details__genre">${genre}</span>`);

  return `<div class="film-details__info-wrap">
<div class="film-details__poster">
  <img class="film-details__poster-img" src="${poster}" alt="${title}">

  <p class="film-details__age">${age}</p>
</div>

<div class="film-details__info">
  <div class="film-details__info-head">
    <div class="film-details__title-wrap">
      <h3 class="film-details__title">${title}</h3>
      <p class="film-details__title-original">Original: ${alternativeTitle}</p>
    </div>

    <div class="film-details__rating">
      <p class="film-details__total-rating">${totalRating}</p>
    </div>
  </div>

  <table class="film-details__table">
    <tbody><tr class="film-details__row">
      <td class="film-details__term">Director</td>
      <td class="film-details__cell">${director}</td>
    </tr>
    <tr class="film-details__row">
      <td class="film-details__term">Writers</td>
      <td class="film-details__cell">${writers.join(', ')}</td>
    </tr>
    <tr class="film-details__row">
      <td class="film-details__term">Actors</td>
      <td class="film-details__cell">${actors.join(', ')}</td>
    </tr>
    <tr class="film-details__row">
      <td class="film-details__term">Release Date</td>
      <td class="film-details__cell">${releaseDate}</td>
    </tr>
    <tr class="film-details__row">
      <td class="film-details__term">Runtime</td>
      <td class="film-details__cell">${duration}</td>
    </tr>
    <tr class="film-details__row">
      <td class="film-details__term">Country</td>
      <td class="film-details__cell">${country}</td>
    </tr>
    <tr class="film-details__row">
      <td class="film-details__term">Genres</td>
      <td class="film-details__cell">
        ${genreElements.join('\n')}
        </td>
    </tr>
  </tbody></table>

  <p class="film-details__film-description">
  ${description}
  </p>
</div>
</div>`;
};

export default class FilmDetailsView {
  #props = null;
  #element = null;

  constructor(props = {}) {
    this.#props = props;
  }

  get template() {
    return createFilmDetailsTemplate(this.#props);
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
