import { createElement } from '../render';

const createCommentTemplate = ({
  emojiSrc = './images/emoji/smile.png',
  emojiTitle = 'emoji-smile',
  commentText = 'Interesting setting and a good cast',
  author = 'Tim Macoveev',
  commentDate = '2019/12/31 23:59',
}) => `<li class="film-details__comment">
<span class="film-details__comment-emoji">
  <img src="${emojiSrc}" width="55" height="55" alt="${emojiTitle}">
</span>
<div>
  <p class="film-details__comment-text">${commentText}</p>
  <p class="film-details__comment-info">
    <span class="film-details__comment-author">${author}</span>
    <span class="film-details__comment-day">${commentDate}</span>
    <button class="film-details__comment-delete">Delete</button>
  </p>
</div>
</li>`;

export default class FilmCommentView {
  constructor(props) {
    this.props = props;
  }

  getTemplate() {
    return createCommentTemplate(this.props);
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
