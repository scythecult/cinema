import { createElement } from '../render';

const createStatsTemplate = (movieCount = '') => `<section class="footer__statistics">
<p>${movieCount} movies inside</p>
</section>`;

export default class StatsView {
  #props = null;
  #element = null;

  constructor(props = {}) {
    this.#props = props;
  }

  get template() {
    return createStatsTemplate(this.#props);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
