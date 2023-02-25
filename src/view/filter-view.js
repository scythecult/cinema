import { createElement } from '../render';

const createFilterItemTemplate = ({ isActive = false, name }) => {
  const activeClass = isActive ? 'sort__button--active' : '';

  return `<li><a href="#" class="sort__button ${activeClass}">${name}</a></li>`;
};

export default class FilterView {
  constructor(props) {
    this.props = props;
  }

  getTemplate() {
    return createFilterItemTemplate(this.props);
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
