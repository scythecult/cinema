import { FILM_ITEMS } from '../model/film-model';
import { render } from '../render';
import FilmCardView from '../view/film-card-view';
import FilmsView from '../view/films-view';

export default class FilmsPresenter {
  constructor() {
    this.filmData = {
      films: FILM_ITEMS.map((item) => new FilmCardView(item).getTemplate()).slice(0, 5),
      topRatedFilms: this.getFilmsBy('rating'),
      mostCommentedFilms: this.getFilmsBy('commentsCount'),
    };
  }

  getFilmsBy(filter, limit = 2) {
    return [...FILM_ITEMS]
      .sort((filmA, filmB) => parseFloat(filmB[filter], 10) - parseFloat(filmA[filter], 10))
      .map((item) => new FilmCardView(item).getTemplate())
      .slice(0, limit);
  }

  init(container) {
    render(new FilmsView(this.filmData), container);
  }
}
