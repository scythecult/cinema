import AbstractView from '../framework/view/abstract-view';

const createNavigationContainerTemplate = () =>
  `<nav class="main-navigation">
  <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
</nav>`;

export default class NavigationView extends AbstractView {
  get template() {
    return createNavigationContainerTemplate();
  }
}
