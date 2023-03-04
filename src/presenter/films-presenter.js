import { render } from '../render';
import FilmCardView from '../view/film-card-view';
import FilmsContainerView from '../view/films-container-view';
import FilmsExtraView from '../view/films-extra-view';
import ShowMoreButtonView from '../view/show-more-button-view';

export default class FilmsPresenter {
  #filmsModel = null;
  #filmsContainer = null;
  #filmList = null;
  #filmListContainer = null;
  #filmsTopRated = null;
  #filmsMostCommented = null;
  #filmsTopRatedContainer = null;
  #filmsMostCommentedContainer = null;
  #topRatedFilms = null;
  #mostCommentedFilms = null;

  constructor(filmsModel = {}) {
    this.#filmsModel = filmsModel;
    this.filmItems = [...this.#filmsModel.films];
  }

  filterFilmsBy = (propA, propB, limit = 2) =>
    [...this.filmItems]
      .sort(
        (filmA, filmB) => parseFloat(filmB[propA][propB], 10) - parseFloat(filmA[propA][propB], 10)
      )
      .slice(0, limit);

  init = (container) => {
    this.#filmsContainer = new FilmsContainerView();
    this.#filmsTopRated = new FilmsExtraView('Top Rated');
    this.#filmsMostCommented = new FilmsExtraView('Most Commented');
    this.#filmList = this.#filmsContainer.element.querySelector('.films-list');
    this.#filmListContainer = this.#filmsContainer.element.querySelector('.films-list__container');
    this.#filmsTopRatedContainer =
      this.#filmsTopRated.element.querySelector('.films-list__container');
    this.#filmsMostCommentedContainer =
      this.#filmsMostCommented.element.querySelector('.films-list__container');
    this.#topRatedFilms = this.filterFilmsBy('filmInfo', 'totalRating');
    this.#mostCommentedFilms = this.filterFilmsBy('comments', 'length');

    render(this.#filmsContainer, container);

    for (const film of this.filmItems) {
      render(new FilmCardView(film), this.#filmListContainer);
    }

    render(new ShowMoreButtonView(), this.#filmList);
    render(this.#filmsTopRated, this.#filmsContainer.element);
    render(this.#filmsMostCommented, this.#filmsContainer.element);

    for (const topRated of this.#topRatedFilms) {
      render(new FilmCardView(topRated), this.#filmsTopRatedContainer);
    }

    for (const mostCommented of this.#mostCommentedFilms) {
      render(new FilmCardView(mostCommented), this.#filmsMostCommentedContainer);
    }
  };
}
