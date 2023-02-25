import { createElement } from '../render';

const createNavigationItemTemplate = ({ name = 'Item', href = '#item', count = '20' } = {}) =>
  `<a href="${href}" class="main-navigation__item">${name} <span class="main-navigation__item-count">${count}</span></a>`;

export default class NavigationItemView {
  constructor(props = {}) {
    this.props = props;
  }

  getTemplate() {
    return createNavigationItemTemplate(this.props);
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
