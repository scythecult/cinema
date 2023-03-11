import AbstractView from '../framework/view/abstract-view';
import { formatDate } from '../utils';

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

export default class FilmCommentView extends AbstractView {
  #props = null;

  constructor(props = {}) {
    super();
    this.#props = props;
  }

  get template() {
    return createCommentTemplate(this.#props);
  }
}
