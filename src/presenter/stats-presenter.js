import { render } from '../framework/render';
import StatsView from '../view/stats-view';

export default class StatsPresenter {
  #movieCount = '2000';
  #statsContainer = null;

  constructor({ container }) {
    this.#statsContainer = container;
  }

  init = () => {
    render(new StatsView(this.#movieCount), this.#statsContainer);
  };
}
