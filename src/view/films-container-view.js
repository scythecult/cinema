import AbstractView from '../framework/view/abstract-view';

const createFilmsContainerTemplate = () => `
<section class="films">
  <section class="films-list">
    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

    <div class="films-list__container">

    </div>

  </section>
</section>`;

export default class FilmsContainerView extends AbstractView {
  get template() {
    return createFilmsContainerTemplate();
  }

  setClickHandler = (callback = () => {}) => {
    this._callback.click = callback;

    this.element.addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();

    this._callback.click(evt);
  };
}
