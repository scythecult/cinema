import { createElement } from '../render';

const createCommentsContainerTemplate = ({ comments = [], newCommentForm = '' }) => {
  const commentsCount = comments.length;

  return `
  <section class="film-details__comments-wrap">
  <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsCount}</span></h3>

  <ul class="film-details__comments-list">
    ${comments.join('\n')}
  </ul>

  ${newCommentForm}
  </section>`;
};

export default class FilmCommentsContainerView {
  constructor(children) {
    this.children = children;
  }

  getTemplate() {
    return createCommentsContainerTemplate(this.children);
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
