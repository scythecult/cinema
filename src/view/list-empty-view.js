import AbstractView from '../framework/view/abstract-view';

const createEmptyListTemplate = () =>
  '<h2 class="films-list__title">There are no movies in our database</h2>';

export default class EmptyListView extends AbstractView {
  get template() {
    return createEmptyListTemplate();
  }
}
