import { render } from '../render';
import FilterView from '../view/filter-view';
import FiltersConainerView from '../view/filters-conainer-view';

export default class FiltersPresenter {
  #filtersConainer = null;
  #filterModel = null;

  constructor(filterModel = {}) {
    this.#filterModel = filterModel;
    this.filterItems = [...this.#filterModel.filters];
  }

  init = (container) => {
    this.#filtersConainer = new FiltersConainerView();

    render(this.#filtersConainer, container);

    for (const filter of this.filterItems) {
      render(new FilterView(filter), this.#filtersConainer.element);
    }
  };
}
