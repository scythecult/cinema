import AbstractView from '../framework/view/abstract-view';

const createFilterItemTemplate = ({ isActive = false, name }) => {
  const activeClass = isActive ? 'sort__button--active' : '';

  return `<li><a href="#" class="sort__button ${activeClass}">${name}</a></li>`;
};

export default class FilterView extends AbstractView {
  #props = null;

  constructor(props = {}) {
    super();
    this.#props = props;
  }

  get template() {
    return createFilterItemTemplate(this.#props);
  }
}
