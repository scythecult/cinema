import { createElement } from '../render';

const createSortTemplate = (filters = []) => `<ul class="sort">
${filters.join('\n')}
</ul>`;

export default class SortView {
  constructor(filters) {
    this.filters = filters;
  }

  getTemplate() {
    return createSortTemplate(this.filters);
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
