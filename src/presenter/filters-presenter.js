import { render, RenderPosition } from '../render';
import FilterView from '../view/filter-view';
import FiltersContainerView from '../view/filters-container-view';

export default class FiltersPresenter {
  #filterModel = null;

  #filtersContainer = new FiltersContainerView();

  constructor(filterModel = {}) {
    this.#filterModel = filterModel;
    this.filterItems = [...this.#filterModel.filters];
  }

  init = (container) => {
    render(this.#filtersContainer, container, RenderPosition.AFTERBEGIN);

    for (const filter of this.filterItems) {
      render(new FilterView(filter), this.#filtersContainer.element);
    }
  };
}
