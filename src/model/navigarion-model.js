const NAVIGATION_ITEMS = [
  { name: 'Watchlist', href: '#watchList', count: '13' },
  { name: 'History', href: '#history', count: '4' },
  { name: 'Favorites', href: '#favorites', count: '8' },
];

export default class NavModel {
  #navItems = NAVIGATION_ITEMS;

  get navItems() {
    return this.#navItems;
  }
}
