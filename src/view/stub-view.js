import AbstractView from '../framework/view/abstract-view';

const createEmptyListTemplate = (textContent) => `<h2 class="films-list__title">${textContent}</h2>`;

export default class StubView extends AbstractView {
  #textContent = '';
  constructor(textContent = 'There are no movies in our database') {
    super();
    this.#textContent = textContent;
  }

  get template() {
    return createEmptyListTemplate(this.#textContent);
  }
}
