import { createElement } from '../render';

const createStatsTemplate = (movieCount = '') => `<section class="footer__statistics">
<p>${movieCount} movies inside</p>
</section>`;

export default class StatsView {
  constructor(props) {
    this.props = props;
  }

  getTemplate() {
    return createStatsTemplate(this.props);
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
