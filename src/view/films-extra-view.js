import AbstractView from '../framework/view/abstract-view';

const createFilmExtraTemplate = (title = 'Title') => `
<section class="films-list films-list--extra">
  <h2 class="films-list__title">${title}</h2>

  <div class="films-list__container">

  </div>
</section>
`;

export default class FilmsExtraView extends AbstractView {
  #title = null;

  constructor(title = 'Title') {
    super();
    this.#title = title;
  }

  get template() {
    return createFilmExtraTemplate(this.#title);
  }
}
