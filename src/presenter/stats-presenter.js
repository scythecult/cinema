import { render } from '../render';
import StatsView from '../view/stats-view';

export default class StatsPresenter {
  #movieCount = '2000';

  init = (container) => {
    render(new StatsView(this.#movieCount), container);
  };
}
