import { createElement } from '../render';

const createCommentsContainerTemplate = (commentsCount) => `
  <section class="film-details__comments-wrap">
  <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsCount}</span></h3>

  <ul class="film-details__comments-list">
  </ul>

  </section>`;

export default class FilmCommentsContainerView {
  #props = null;
  #element = null;

  constructor(props = '') {
    this.#props = props;
  }

  get template() {
    return createCommentsContainerTemplate(this.#props);
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
