import AbstractView from '../framework/view/abstract-view';

const createPopupTemplate = () =>
  `
  <section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
    </div>

    <div class="film-details__bottom-container">
    </div>
  </form>
</section>`;

export default class PopupView extends AbstractView {
  get template() {
    return createPopupTemplate();
  }

  setClickHandler = (callback = () => {}) => {
    this._callback.click = callback;

    this.element.addEventListener('click', this.#clickHandler);
  };

  addOverflow = () => {
    document.body.classList.add('hide-overflow');
  };

  removeOverflow = () => {
    document.body.classList.remove('hide-overflow');
  };

  #clickHandler = (evt) => {
    const closeButton = evt.target.closest('.film-details__close-btn');

    if (!closeButton) {
      return;
    }

    this._callback.click();
    this.removeOverflow();
  };
}
