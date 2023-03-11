import AbstractView from '../framework/view/abstract-view';

const createFiltersContainerTemplate = () => `<ul class="sort">
</ul>`;

export default class FiltersContainerView extends AbstractView {
  get template() {
    return createFiltersContainerTemplate();
  }
}
