import { createElement } from '../render';

const createNavigationContainerTemplate = (items = []) =>
  `<nav class="main-navigation">
  <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
  ${items.join('\n')}
</nav>`;

export default class NavigationView {
  constructor(items = []) {
    this.items = items;
  }

  getTemplate() {
    return createNavigationContainerTemplate(this.items);
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
