import { FILTER_ITEMS } from '../model/filter-model';
import { render } from '../render';
import FilterView from '../view/filter-view';
import SortView from '../view/sort-view';

export default class SortPresenter {
  constructor() {
    this.filterItems = FILTER_ITEMS.map((item) => new FilterView(item).getTemplate());
  }

  init(container) {
    render(new SortView(this.filterItems), container);
  }
}
