import AbstractView from '../framework/view/abstract-view';

const createLoaderTemplate = () => '<h2 class="films-list__title">Loading...</h2>';

export default class LoaderView extends AbstractView {
  get template() {
    return createLoaderTemplate();
  }
}
