import { createElement } from '../render';

const createFilterItemTemplate = ({ isActive = false, name }) => {
  const activeClass = isActive ? 'sort__button--active' : '';

  return `<li><a href="#" class="sort__button ${activeClass}">${name}</a></li>`;
};

export default class FilterView {
  #props = null;
  #element = null;

  constructor(props = {}) {
    this.#props = props;
  }

  get template() {
    return createFilterItemTemplate(this.#props);
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
