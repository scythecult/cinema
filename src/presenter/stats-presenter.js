import { render } from '../framework/render';
import StatsView from '../view/stats-view';

export default class StatsPresenter {
  #statsContainer = null;

  constructor({ container }) {
    this.#statsContainer = container;
  }

  init = (filmsCount) => {
    render(new StatsView(filmsCount), this.#statsContainer);
  };
}
