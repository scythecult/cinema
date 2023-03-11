import { EMOTIONS } from '../const';
import AbstractView from '../framework/view/abstract-view';

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

export default class NewCommentFormView extends AbstractView {
  get template() {
    return createNewCommentFormTemplate();
  }
}
