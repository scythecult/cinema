import Observable from '../framework/observable';
import { generateFilmInfo } from '../mock/film';

export default class FilmsModel extends Observable {
  #films = Array.from({ length: 14 }, generateFilmInfo);

  get films() {
    return this.#films;
  }

  update = (updateType, update) => {
    const index = this.#films.findIndex((item) => item.id === update.id);

    if (index === -1) {
      return this.#films;
    }

    this.#films = [...this.#films.slice(0, index), update, ...this.#films.slice(index + 1)];

    this._notify(updateType, update);
  };
}
