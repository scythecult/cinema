import { NAVIGATION_ITEMS } from '../model/navigarion-model';
import { render } from '../render';
import NavigationItemView from '../view/navigation-item-view';
import NavigationView from '../view/navigation-view';

export default class NavigationPresenter {
  constructor() {
    this.navigationItems = NAVIGATION_ITEMS.map((item) =>
      new NavigationItemView(item).getTemplate()
    );
  }

  init(container) {
    render(new NavigationView(this.navigationItems), container);
  }
}
