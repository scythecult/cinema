import { FilterType } from '../const';
import AbstractView from '../framework/view/abstract-view';

const StubText = {
  [FilterType.ALL]: 'There are no movies in our database',
  [FilterType.WATCHLIST]: 'There are no movies to watch now',
  [FilterType.HISTORY]: 'There are no watched movies now',
  [FilterType.FAVORITE]: 'There are no favorite movies now',
};

const createEmptyListTemplate = (filterType) => {
  const stubText = StubText[filterType];

  return `<h2 class="films-list__title">${stubText}</h2>`;
};

export default class StubView extends AbstractView {
  #filterType = '';
  constructor(filterType = FilterType.ALL) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createEmptyListTemplate(this.#filterType);
  }
}
