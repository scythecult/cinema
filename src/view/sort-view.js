import { SortType } from '../const';
import AbstractView from '../framework/view/abstract-view';

const createSortTemplate = (currentSortType) => {
  const defaultSortClassName = currentSortType === SortType.DEFAULT ? 'sort__button--active' : '';
  const byDateSortClassName = currentSortType === SortType.BY_DATE ? 'sort__button--active' : '';
  const byRatingClassName = currentSortType === SortType.BY_RATING ? 'sort__button--active' : '';

  return `<ul class="sort">
  <li><a href="#" class="sort__button ${defaultSortClassName}" data-sort-type='${SortType.DEFAULT}'>Sort by default</a></li>
  <li><a href="#" class="sort__button ${byDateSortClassName}" data-sort-type='${SortType.BY_DATE}'>Sort by date</a></li>
  <li><a href="#" class="sort__button ${byRatingClassName}" data-sort-type='${SortType.BY_RATING}'>Sort by rating</a></li>
</ul>`;
};

export default class SortView extends AbstractView {
  #currentSortType = null;

  #handleSortTypeChangeClick = null;

  constructor({ currentSortType = '', onSortTypeChange }) {
    super();
    this.#currentSortType = currentSortType;
    this.#handleSortTypeChangeClick = onSortTypeChange;

    this.element.addEventListener('click', this.#addFilterChangeClick);
  }

  get template() {
    return createSortTemplate(this.#currentSortType);
  }

  #addFilterChangeClick = (evt) => {
    const sortButtonNode = evt.target.closest('.sort__button');

    if (!sortButtonNode) {
      return;
    }
    evt.preventDefault();

    const { sortType } = sortButtonNode.dataset;

    this.#handleSortTypeChangeClick(sortType);
  };
}
