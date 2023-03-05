const FILTER_ITEMS = [
  {
    name: 'Sort by default',
    isActive: true,
  },
  {
    name: 'Sort by date',
    isActive: false,
  },
  {
    name: 'Sort by rating',
    isActive: false,
  },
];

export default class FiltersModel {
  #filters = FILTER_ITEMS;

  get filters() {
    return this.#filters;
  }
}
