import { EMOTIONS } from '../const';
import AbstractView from '../framework/view/abstract-view';
import { formatDate } from '../utils';

const createDropdownTemplate = () => '<div class="dropdown"></div>';

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

const createCommentTemplate = (props = {}) => {
  const {
    emotion = './images/emoji/smile.png',
    comment = 'Interesting setting and a good cast',
    author = 'Tim Macoveev',
    date = '2019/12/31 23:59',
  } = props;
  const formattedDate = formatDate(date);

  return `<li class="film-details__comment">
<span class="film-details__comment-emoji">
  <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="${emotion}">
</span>
<div>
  <p class="film-details__comment-text">${comment}</p>
  <p class="film-details__comment-info">
    <span class="film-details__comment-author">${author}</span>
    <span class="film-details__comment-day">${formattedDate}</span>
    <button class="film-details__comment-delete">Delete</button>
  </p>
</div>
</li>`;
};

const createCommentEmojiTemplate = () =>
  EMOTIONS.map(
    (
      emotion
    ) => `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emotion}" value="${emotion}">
  <label class="film-details__emoji-label" for="emoji-${emotion}">
    <img src="./images/emoji/${emotion}.png" width="30" height="30" alt="${emotion}">
  </label>`
  ).join('\n');

const createNewCommentFormTemplate = () => {
  const emotionsTemplate = createCommentEmojiTemplate();

  return `
  <div class="film-details__new-comment">
  <div class="film-details__add-emoji-label"></div>

  <label class="film-details__comment-label">
    <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
  </label>

  <div class="film-details__emoji-list">
 ${emotionsTemplate}
  </div>
  </div>`;
};

const createCommentsTemplate = (comments = []) => {
  const commentsTemplate = comments.map(createCommentTemplate);
  const newCommentFormView = createNewCommentFormTemplate();
  const commentsCount = comments.length;

  return `
  <section class="film-details__comments-wrap">
  <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsCount}</span></h3>

  <ul class="film-details__comments-list">
  ${commentsTemplate.join('\n')}
  </ul>
  ${newCommentFormView}
  </section>`;
};

const createPopupTemplate = ({ film = {}, comments = [] } = {}) => {
  const { filmInfo, userDetails } = film;
  const dropdownTemplate = createDropdownTemplate();
  const filmDetailsTemplate = createFilmDetailsTemplate(filmInfo);
  const filmDetailsControlsTemplate = createFilmDetailsControlsTemplate(userDetails);
  const commentsTemplate = createCommentsTemplate(comments);

  return `
  <div>
    ${dropdownTemplate}
    <section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="film-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          ${filmDetailsTemplate}
          ${filmDetailsControlsTemplate}
        </div>

        <div class="film-details__bottom-container">
        ${commentsTemplate}
        </div>
      </form>
    </section>
  </div>

  `;
};

export default class PopupView extends AbstractView {
  #film = null;
  #comments = null;

  #handleCloseClick = null;
  #handleKeydown = null;
  #handleWatchistClick = null;
  #handleWatchedClick = null;
  #handleFavoriteClick = null;

  constructor({
    film,
    comments,
    onCloseClick,
    onKeydown,
    onWatchlistClick,
    onWatchedClick,
    onFavoriteClick,
  }) {
    super();
    this.#film = film;
    this.#comments = comments;
    this.#handleCloseClick = onCloseClick;
    this.#handleKeydown = onKeydown;
    this.#handleWatchistClick = onWatchlistClick;
    this.#handleWatchedClick = onWatchedClick;
    this.#handleFavoriteClick = onFavoriteClick;

    document.addEventListener('keydown', this.#keydownHandler);
    this.element.addEventListener('click', this.#closeClickHandler);
    this.element.querySelector('#watchlist').addEventListener('click', this.#addToWatchlistClick);
    this.element.querySelector('#watched').addEventListener('click', this.#addToWatchedClick);
    this.element.querySelector('#favorite').addEventListener('click', this.#addToFavoriteClick);
  }

  get template() {
    return createPopupTemplate({ film: this.#film, comments: this.#comments });
  }

  addOverflow = () => {
    document.body.classList.add('hide-overflow');
  };

  removeOverflow = () => {
    document.body.classList.remove('hide-overflow');
  };

  #addToWatchlistClick = (evt) => {
    evt.preventDefault();

    this.#handleWatchistClick();
  };

  #addToWatchedClick = (evt) => {
    evt.preventDefault();

    this.#handleWatchedClick();
  };

  #addToFavoriteClick = (evt) => {
    evt.preventDefault();

    this.#handleFavoriteClick();
  };

  #keydownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();

      this.#handleKeydown();
      document.removeEventListener('keydown', this.#keydownHandler);
    }
  };

  #closeClickHandler = (evt) => {
    evt.preventDefault();
    const closeButton = evt.target.closest('.film-details__close-btn');

    if (!closeButton) {
      return;
    }

    this.#handleCloseClick();
    this.removeOverflow();
    document.removeEventListener('keydown', this.#keydownHandler);
  };
}
