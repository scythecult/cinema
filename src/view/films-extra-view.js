import { createElement } from '../render';

const createFilmExtraTemplate = (title = 'Title') => `
<section class="films-list films-list--extra">
  <h2 class="films-list__title">${title}</h2>

  <div class="films-list__container">

  </div>
</section>
`;

export default class FilmsExtraView {
  #element = null;
  #title = null;

  constructor(title = 'Title') {
    this.#title = title;
  }

  get template() {
    return createFilmExtraTemplate(this.#title);
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
