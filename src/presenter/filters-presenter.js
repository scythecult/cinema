import { render, RenderPosition } from '../framework/render';
import FilterView from '../view/filter-view';
import FiltersContainerView from '../view/filters-container-view';

export default class FiltersPresenter {
  #filtersModel = null;

  #filtersContainer = new FiltersContainerView();

  constructor({ filtersModel = {} }) {
    this.#filtersModel = filtersModel;
    this.filterItems = [...this.#filtersModel.filters];
  }

  init = (container) => {
    render(this.#filtersContainer, container, RenderPosition.AFTERBEGIN);

    for (const filter of this.filterItems) {
      render(new FilterView(filter), this.#filtersContainer.element);
    }
  };
}
