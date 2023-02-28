import { generateFilmInfo } from '../mock/film';

export default class FilmsModel {
  constructor() {
    this.films = Array.from({ length: 10 }, generateFilmInfo);
  }

  getFilms() {
    return this.films;
  }
}
