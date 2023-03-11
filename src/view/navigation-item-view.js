import AbstractView from '../framework/view/abstract-view';

const createNavigationItemTemplate = ({ name = 'Item', href = '#item', count = '20' } = {}) =>
  `<a href="${href}" class="main-navigation__item">${name} <span class="main-navigation__item-count">${count}</span></a>`;

export default class NavigationItemView extends AbstractView {
  #props = null;

  constructor(props = {}) {
    super();
    this.#props = props;
  }

  get template() {
    return createNavigationItemTemplate(this.#props);
  }
}
