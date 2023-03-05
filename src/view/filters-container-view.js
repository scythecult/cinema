import { createElement } from '../render';

const createFiltersContainerTemplate = () => `<ul class="sort">
</ul>`;

export default class FiltersContainerView {
  #element = null;

  get template() {
    return createFiltersContainerTemplate();
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
