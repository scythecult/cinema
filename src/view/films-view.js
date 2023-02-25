import { createElement } from '../render';

const createFilmsContainerTemplate = ({
  films = [],
  topRatedFilms = [],
  mostCommentedFilms = [],
} = {}) => `<section class="films">
<section class="films-list">
  <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

  <div class="films-list__container">
  ${films.join('\n')}
  </div>

  <button class="films-list__show-more">Show more</button>
</section>

<section class="films-list films-list--extra">
  <h2 class="films-list__title">Top rated</h2>

  <div class="films-list__container">
    ${topRatedFilms.join('\n')}
  </div>
</section>

<section class="films-list films-list--extra">
  <h2 class="films-list__title">Most commented</h2>

  <div class="films-list__container">
  ${mostCommentedFilms.join('\n')}
  </div>
</section>
</section>`;

export default class FilmsView {
  constructor(filmData = {}) {
    this.filmData = filmData;
  }

  getTemplate() {
    return createFilmsContainerTemplate(this.filmData);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
