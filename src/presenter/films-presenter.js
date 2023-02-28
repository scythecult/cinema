import { render } from '../render';
import FilmCardView from '../view/film-card-view';
import FilmsView from '../view/films-view';

export default class FilmsPresenter {
  filterFilmsBy(propA, propB, limit = 2) {
    return [...this.films]
      .sort(
        (filmA, filmB) => parseFloat(filmB[propA][propB], 10) - parseFloat(filmA[propA][propB], 10)
      )
      .slice(0, limit);
  }

  generateFilmsFrom(films = []) {
    return films.map((film) => new FilmCardView(film).getTemplate());
  }

  init(container, filmsModel) {
    this.filmsModel = filmsModel;
    this.films = [...this.filmsModel.getFilms()];
    this.topRatedFilms = this.filterFilmsBy('filmInfo', 'totalRating');
    this.mostCommentedFilms = this.filterFilmsBy('comments', 'length');

    this.filmsChildren = {
      films: this.generateFilmsFrom(this.films),
      topRatedFilms: this.generateFilmsFrom(this.topRatedFilms),
      mostCommentedFilms: this.generateFilmsFrom(this.mostCommentedFilms),
    };

    render(new FilmsView(this.filmsChildren), container);
  }
}
