import { generateFilmInfo } from '../mock/film';

export default class FilmsModel {
  #films = Array.from({ length: 10 }, generateFilmInfo);

  get films() {
    return this.#films;
  }
}
