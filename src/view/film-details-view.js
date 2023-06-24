import { EMOTIONS } from '../const';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { humanizeCommentDate, humanizeDate } from '../utils/film';

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
    duration = '1h 18m',
    genres = ['Drama', 'Film-Noir', 'Mystery'],
    description = 'The film opens following a murder at a cabaret in Mexico City in 1936, and then presents the events leading up to it in flashback. The Great Flamarion (Erich von Stroheim) is an arrogant, friendless, and misogynous marksman who displays his trick gunshot act in the vaudeville circuit. His show features a beautiful assistant, Connie (Mary Beth Hughes) and her drunken husband Al (Dan Duryea), Flamarions other assistant. Flamarion falls in love with Connie, the movies femme fatale, and is soon manipulated by her into killing her no good husband during one of their acts.',
    age = '18+',
    release: { date, releaseCountry },
  } = props;

  const releaseDate = humanizeDate(date);
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
      <td class="film-details__cell">${releaseCountry}</td>
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
    id,
    emotion = 'smile',
    comment = 'Interesting setting and a good cast',
    author = 'Tim Macoveev',
    date = '2019/12/31 23:59',
    isDeleting,
  } = props;
  const formattedDate = humanizeCommentDate(date);
  const disabled = isDeleting ? 'disabled' : '';
  const statusText = isDeleting ? 'Deleting...' : 'Delete';

  return `<li class="film-details__comment" >
<span class="film-details__comment-emoji">
  <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="${emotion}">
</span>
<div>
  <p class="film-details__comment-text">${comment}</p>
  <p class="film-details__comment-info">
    <span class="film-details__comment-author">${author}</span>
    <span class="film-details__comment-day">${formattedDate}</span>
    <button class="film-details__comment-delete" ${disabled} data-id=${id}>${statusText}</button>
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

const createIconEmojiTemplate = (emotion = 'smile') =>
  `<img src="images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">`;

const createNewCommentFormTemplate = ({ comment = '', emotion = 'smile', isDisabled }) => {
  const emotionsTemplate = createCommentEmojiTemplate();
  const emojiIconTemplate = emotion ? createIconEmojiTemplate(emotion) : '';

  return `
  <div class="film-details__new-comment">
  <div class="film-details__add-emoji-label">
  ${emojiIconTemplate}
  </div>

  <label class="film-details__comment-label">

    <textarea class="film-details__comment-input"
     placeholder="Select reaction below and write comment here"
     name="comment"
     ${isDisabled ? 'disabled' : ''}
     value='${comment}'>${comment}</textarea>
  </label>

  <div class="film-details__emoji-list">
 ${emotionsTemplate}
  </div>
  </div>`;
};

const createCommentsTemplate = ({ comments = [], comment = '', emotion = 'smile', deletingCommentId, isDisabled }) => {
  const commentsTemplate = comments.map((currentComment) => {
    const isDeleting = currentComment.id === deletingCommentId;

    return createCommentTemplate({ ...currentComment, isDeleting });
  });
  const newCommentFormView = createNewCommentFormTemplate({ comment, emotion, isDisabled });
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

const createPopupTemplate = ({ film = {} } = {}) => {
  const {
    comments,
    filmInfo,
    userDetails,
    commentInfo: { comment, emotion },
    deletingCommentId,
    isDisabled,
  } = film;

  const dropdownTemplate = createDropdownTemplate();
  const filmDetailsTemplate = createFilmDetailsTemplate(filmInfo);
  const filmDetailsControlsTemplate = createFilmDetailsControlsTemplate(userDetails);
  const commentsTemplate = createCommentsTemplate({
    deletingCommentId,
    isDisabled,
    comments,
    comment,
    emotion,
  });

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

export default class DetailsView extends AbstractStatefulView {
  #handleCloseClick = null;
  #handleKeydown = null;
  #handleWatchlist = null;
  #handleWatched = null;
  #handleFavorite = null;
  #handleAddComment = null;
  #handleDeleteComment = null;

  constructor({
    film,
    comments = [],
    onCloseClick = () => {},
    onKeydown = () => {},
    onWatchlistClick = () => {},
    onWatchedClick = () => {},
    onFavoriteClick = () => {},
    onAddCommentClick = () => {},
    onDeleteCommentClick = () => {},
  }) {
    super();
    this._state = DetailsView.convertFilmToState({ ...film, comments });
    this.#handleCloseClick = onCloseClick;
    this.#handleKeydown = onKeydown;
    this.#handleWatchlist = onWatchlistClick;
    this.#handleWatched = onWatchedClick;
    this.#handleFavorite = onFavoriteClick;
    this.#handleAddComment = onAddCommentClick;
    this.#handleDeleteComment = onDeleteCommentClick;

    this.#setInnerHandlers();
  }

  static convertFilmToState = (info) => ({
    ...info,
    commentInfo: { comment: '', emotion: '' },
    deletingCommentId: '0',
    isDisabled: false,
  });

  static convertStateToFilm = (state) => {
    const info = { ...state };

    delete info.comments;
    delete info.commentInfo;
    delete info.deletingCommentId;
    delete info.isDisabled;

    return info;
  };

  get template() {
    return createPopupTemplate({ film: this._state });
  }

  _restoreHandlers = () => {
    this.#setInnerHandlers();
  };

  addOverflow = () => {
    document.body.classList.add('hide-overflow');
  };

  removeOverflow = () => {
    document.body.classList.remove('hide-overflow');
  };

  getScrollPosition = () => this.element.querySelector('.film-details').scrollTop;

  setScrollPosition = (scrollPosition) => {
    requestAnimationFrame(() => {
      this.element.querySelector('.film-details').scrollTop = scrollPosition;
    });
  };

  #setInnerHandlers = () => {
    document.addEventListener('keydown', this.#keydownHandler);
    this.element.addEventListener('click', this.#closeClickHandler);
    this.element.querySelector('#watchlist').addEventListener('click', this.#addToWatchlistClick);
    this.element.querySelector('#watched').addEventListener('click', this.#addToWatchedClick);
    this.element.querySelector('#favorite').addEventListener('click', this.#addToFavoriteClick);
    this.element.querySelector('.film-details__new-comment').addEventListener('keydown', this.#handleCommentSubmit);
    this.element.querySelector('.film-details__comment-input').addEventListener('input', this.#handleCommentInput);
    this.element.querySelector('.film-details__emoji-list').addEventListener('click', this.#handleEmojiClick);
    this.element
      .querySelector('.film-details__comments-list')
      .addEventListener('click', this.#handleCommentDeleteClick);
  };

  markEmojiAsChecked = () => {
    const { emotion } = this._state.commentInfo;

    if (!emotion) {
      return;
    }

    this.element.querySelector(`#emoji-${emotion}`).checked = true;
  };

  #handleEmojiClick = (evt) => {
    evt.preventDefault();
    const emojiLabelElement = evt.target.closest('.film-details__emoji-label');

    if (!emojiLabelElement) {
      return;
    }

    const currentEmoji = emojiLabelElement.getAttribute('for');
    const currentInput = evt.currentTarget.querySelector(`#${currentEmoji}`);
    const scrollPosition = this.getScrollPosition();

    this.updateElement({
      commentInfo: { ...this._state.commentInfo, emotion: currentInput.value },
    });

    this.setScrollPosition(scrollPosition);
    this.markEmojiAsChecked();
  };

  #resetCommentForm = () => {
    this._setState({ commentInfo: { comment: '', emotion: '' } });
  };

  #handleCommentSubmit = (evt) => {
    if (evt.code === 'Enter' && (evt.ctrlKey || evt.metaKey)) {
      const { commentInfo } = this._state;

      if (!commentInfo.comment || !commentInfo.emotion) {
        return;
      }

      const filmInfo = DetailsView.convertStateToFilm(this._state);
      const newComment = { comment: { ...this._state.commentInfo }, film: filmInfo };

      this.#resetCommentForm();
      this.#handleAddComment(newComment);
    }
  };

  #handleCommentDeleteClick = (evt) => {
    const deleteElement = evt.target.closest('.film-details__comment-delete');

    if (!deleteElement) {
      return;
    }
    const { id } = deleteElement.dataset;
    const filmInfo = DetailsView.convertStateToFilm(this._state);
    const commentInfo = { commentId: id, film: filmInfo };

    this.#handleDeleteComment(commentInfo);
  };

  #handleCommentInput = (evt) => {
    const comment = evt.target.value.trim();

    this._setState({ commentInfo: { ...this._state.commentInfo, comment } });
  };

  #addToWatchlistClick = (evt) => {
    evt.preventDefault();
    this.#handleWatchlist();
    this.markEmojiAsChecked();
  };

  #addToWatchedClick = (evt) => {
    evt.preventDefault();
    this.#handleWatched();
    this.markEmojiAsChecked();
  };

  #addToFavoriteClick = (evt) => {
    evt.preventDefault();
    this.#handleFavorite();
    this.markEmojiAsChecked();
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
    document.removeEventListener('keydown', this.#keydownHandler);
  };
}
