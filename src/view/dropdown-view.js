import { createElement } from '../render';

const createDropdownTemplate = () => '<div class="dropdown"></div>';

export default class DropdownView {
  #element = null;

  get template() {
    return createDropdownTemplate();
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
