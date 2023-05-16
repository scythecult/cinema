import { FilterType, UpdateType } from '../const';
import { remove, render, replace } from '../framework/render';
import { filter } from '../utils/filter';
import FiltersView from '../view/filters-view';

export default class FiltersPresenter {
  #filterModel = null;
  #filmsModel = null;

  #filterComponent = null;
  #filterContainer = null;

  constructor({ container, filterModel = {}, filmsModel = {} } = {}) {
    this.#filterModel = filterModel;
    this.#filmsModel = filmsModel;
    this.#filterContainer = container;

    this.#filterModel.addObserver(this.#handleModelEvent);
    this.#filmsModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const films = this.#filmsModel.films;

    return [
      {
        type: FilterType.ALL,
        name: 'All Movies',
        count: filter[FilterType.ALL](films),
      },
      {
        type: FilterType.WATCHLIST,
        name: 'Watchlist',
        count: filter[FilterType.WATCHLIST](films).length,
      },
      {
        type: FilterType.HISTORY,
        name: 'History',
        count: filter[FilterType.HISTORY](films).length,
      },
      {
        type: FilterType.FAVORITE,
        name: 'Favorites',
        count: filter[FilterType.FAVORITE](films).length,
      },
    ];
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };

  init = () => {
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FiltersView({
      filters: this.filters,
      currentFilter: this.#filterModel.filter,
      onFilterClick: this.#handleFilterTypeChange,
    });

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);

      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  };
}
