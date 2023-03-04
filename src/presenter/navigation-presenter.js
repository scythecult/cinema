import { render } from '../render';
import NavigationItemView from '../view/navigation-item-view';
import NavigationView from '../view/navigation-view';

export default class NavigationPresenter {
  #navigationContainer = null;
  #navModel = null;

  constructor(navModel = {}) {
    this.#navModel = navModel;
    this.navItems = [...this.#navModel.navItems];
  }

  init = (container) => {
    this.#navigationContainer = new NavigationView();

    render(this.#navigationContainer, container);

    for (const navItem of this.navItems) {
      render(new NavigationItemView(navItem), this.#navigationContainer.element);
    }
  };
}
