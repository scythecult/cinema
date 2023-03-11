import AbstractView from '../framework/view/abstract-view';

const createStatsTemplate = (movieCount = '') => `<section class="footer__statistics">
<p>${movieCount} movies inside</p>
</section>`;

export default class StatsView extends AbstractView {
  #props = null;

  constructor(props = {}) {
    super();
    this.#props = props;
  }

  get template() {
    return createStatsTemplate(this.#props);
  }
}
