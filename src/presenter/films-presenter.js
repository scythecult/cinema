import { remove, render, RenderPosition } from '../framework/render';
import FilmCardView from '../view/film-card-view';
import FilmsContainerView from '../view/films-container-view';
import FilmsExtraView from '../view/films-extra-view';
import EmptyListView from '../view/list-empty-view';
import ShowMoreButtonView from '../view/show-more-button-view';
import FilmPresenter from './film-presenter';
import FiltersPresenter from './filters-presenter';

const FILM_COUNT_PER_STEP = 5;
export default class FilmsPresenter {
  #filmsModel = {};
  #filtersModel = {};
  #filmItems = [];
  #filmPresenter = new Map();

  #filmList = null;
  #filmListContainer = null;
  #filmsTopRatedContainer = null;
  #filmsMostCommentedContainer = null;
  #topRatedFilms = null;
  #mostCommentedFilms = null;
  #renderedFilmCount = FILM_COUNT_PER_STEP;

  #filmFiltersPresenter = null;
  #filmsContainerComponent = new FilmsContainerView();
  #filmsEmptyComponent = new EmptyListView();
  #showMoreButtonComponent = new ShowMoreButtonView();
  #filmsTopRatedComponent = new FilmsExtraView('Top Rated');
  #filmsMostCommentedComponent = new FilmsExtraView('Most Commented');

  constructor(filmsModel = {}, filtersModel = {}) {
    this.#filmsModel = filmsModel;
    this.#filmItems = [...this.#filmsModel.films];
    this.#filtersModel = filtersModel;
  }

  #filterFilmsBy = (propA, propB, limit = 2) =>
    [...this.#filmItems]
      .sort(
        (filmA, filmB) => parseFloat(filmB[propA][propB], 10) - parseFloat(filmA[propA][propB], 10)
      )
      .slice(0, limit);

  #renderFilters = (filtersModel) => {
    this.#filmFiltersPresenter = new FiltersPresenter(filtersModel);

    this.#filmFiltersPresenter.init(this.#filmList);
  };

  #renderFilms = (from, to) => {
    this.#filmItems.slice(from, to).forEach((film) => this.#renderFilm(film));
  };

  #renderFilm = (selectedFilm = {}) => {
    const filmPresenter = new FilmPresenter(this.#filmListContainer);
    filmPresenter.init(selectedFilm);
    this.#filmPresenter.set(selectedFilm.id, filmPresenter);
  };

  #renderFilmList = () => {
    this.#renderFilms(0, Math.min(this.#filmItems.length, FILM_COUNT_PER_STEP));
  };

  #renderStub = () => {
    render(this.#filmsEmptyComponent, this.#filmList, RenderPosition.AFTERBEGIN);
  };

  #renderExtraFilms = (extraInfo = [], container = {}) => {
    for (const extra of extraInfo) {
      render(new FilmCardView(extra), container);
    }
  };

  #clearFilmList = () => {
    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();
    this.#renderedFilmCount = FILM_COUNT_PER_STEP;
    remove(this.#showMoreButtonComponent);
  };

  #handleShowMoreClick = () => {
    this.#renderFilms(this.#renderedFilmCount, this.#renderedFilmCount + FILM_COUNT_PER_STEP);

    this.#renderedFilmCount += FILM_COUNT_PER_STEP;

    if (this.#renderedFilmCount >= this.#filmItems.length) {
      remove(this.#showMoreButtonComponent);
    }
  };

  init = (container) => {
    this.#filmList = this.#filmsContainerComponent.element.querySelector('.films-list');
    this.#filmListContainer =
      this.#filmsContainerComponent.element.querySelector('.films-list__container');
    this.#filmsTopRatedContainer =
      this.#filmsTopRatedComponent.element.querySelector('.films-list__container');
    this.#filmsMostCommentedContainer =
      this.#filmsMostCommentedComponent.element.querySelector('.films-list__container');
    this.#topRatedFilms = this.#filterFilmsBy('filmInfo', 'totalRating');
    this.#mostCommentedFilms = this.#filterFilmsBy('comments', 'length');

    render(this.#filmsContainerComponent, container);

    if (!this.#filmItems.length) {
      this.#renderStub();

      return;
    }

    this.#renderFilters(this.#filtersModel);
    this.#renderFilmList();

    if (this.#filmItems.length > FILM_COUNT_PER_STEP) {
      render(this.#showMoreButtonComponent, this.#filmList);

      this.#showMoreButtonComponent.setClickHandler(this.#handleShowMoreClick);
    }

    render(this.#filmsTopRatedComponent, this.#filmsContainerComponent.element);
    render(this.#filmsMostCommentedComponent, this.#filmsContainerComponent.element);

    this.#renderExtraFilms(this.#topRatedFilms, this.#filmsTopRatedContainer);
    this.#renderExtraFilms(this.#mostCommentedFilms, this.#filmsMostCommentedContainer);
  };
}
