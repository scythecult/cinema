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
}
