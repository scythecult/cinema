import { createElement } from '../render';

const createNavigationItemTemplate = ({ name = 'Item', href = '#item', count = '20' } = {}) =>
  `<a href="${href}" class="main-navigation__item">${name} <span class="main-navigation__item-count">${count}</span></a>`;

export default class NavigationItemView {
  #element = null;
  #props = null;

  constructor(props = {}) {
    this.#props = props;
  }

  get template() {
    return createNavigationItemTemplate(this.#props);
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
