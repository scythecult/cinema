import { createElement } from '../render';

const createPopupTemplate = ({ filmDetails = '', detailsControls = '', commentsContainer = '' }) =>
  `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
    ${filmDetails}
    ${detailsControls}
    </div>

    <div class="film-details__bottom-container">
      ${commentsContainer}
    </div>
  </form>
</section>`;

export default class PopupView {
  constructor(children) {
    this.children = children;
  }

  getTemplate() {
    return createPopupTemplate(this.children);
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
