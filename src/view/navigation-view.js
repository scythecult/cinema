import { createElement } from '../render';

const createNavigationContainerTemplate = () =>
  `<nav class="main-navigation">
  <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
</nav>`;

export default class NavigationView {
  #element = null;

  get template() {
    return createNavigationContainerTemplate();
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
