import AbstractView from '../framework/view/abstract-view';

const createCommentsContainerTemplate = (commentsCount) => `
  <section class="film-details__comments-wrap">
  <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsCount}</span></h3>

  <ul class="film-details__comments-list">
  </ul>

  </section>`;

export default class FilmCommentsContainerView extends AbstractView {
  #props = null;

  constructor(props = '') {
    super();
    this.#props = props;
  }

  get template() {
    return createCommentsContainerTemplate(this.#props);
  }
}
