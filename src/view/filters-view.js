import AbstractView from '../framework/view/abstract-view';

const createFilterTemplate = ({ filter, currentFilter }) => {
  const { type, name, count } = filter;
  const activeClass = type === currentFilter ? 'main-navigation__item--active' : '';
  const countTemplate = type !== 'all' ? `<span class="main-navigation__item-count">${count}</span>` : '';

  return `<a href="${type}" data-filter-type=${type} class="main-navigation__item ${activeClass}">${name}
    ${countTemplate}
   </a>`;
};

const createFiltersTemplate = ({ filters, currentFilter }) => {
  const filterTemplates = filters.map((filter) => createFilterTemplate({ filter, currentFilter })).join('\n');

  return `<nav class="main-navigation">
  ${filterTemplates}
  </nav>`;
};

export default class FiltersView extends AbstractView {
  #filters = null;
  #currentFilter = null;

  #handleFilterClick = null;

  constructor({ filters, currentFilter, onFilterClick }) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilter;
    this.#handleFilterClick = onFilterClick;

    this.element.addEventListener('click', this.#addFilterClick);
  }

  get template() {
    return createFiltersTemplate({ filters: this.#filters, currentFilter: this.#currentFilter });
  }

  #addFilterClick = (evt) => {
    evt.preventDefault();

    const filterElement = evt.target.closest('.main-navigation__item');

    if (!filterElement) {
      return;
    }

    const { filterType } = filterElement.dataset;

    this.#handleFilterClick(filterType);
  };
}
