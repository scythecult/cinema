import { render } from '../render';
import FilterView from '../view/filter-view';
import FiltersContainerView from '../view/filters-container-view';

export default class FiltersPresenter {
  #filtersContainer = null;
  #filterModel = null;

  constructor(filterModel = {}) {
    this.#filterModel = filterModel;
    this.filterItems = [...this.#filterModel.filters];
  }

  init = (container) => {
    this.#filtersContainer = new FiltersContainerView();

    render(this.#filtersContainer, container);

    for (const filter of this.filterItems) {
      render(new FilterView(filter), this.#filtersContainer.element);
    }
  };
}
