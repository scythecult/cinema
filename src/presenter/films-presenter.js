import { remove, render, RenderPosition } from '../framework/render';
import { updateItem } from '../utils';
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
  #filmsEmptyComponent = null;
  #showMoreButtonComponent = null;
  #filmsTopRatedComponent = null;
  #filmsMostCommentedComponent = null;

  constructor({ filmsModel = {}, filtersModel = {} }) {
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
    this.#filmFiltersPresenter = new FiltersPresenter({ filtersModel });

    this.#filmFiltersPresenter.init(this.#filmList);
  };

  #handleFilmChange = (updatedFilm) => {
    this.#filmItems = updateItem(this.#filmItems, updatedFilm);
    this.#filmPresenter.get(updatedFilm.id).init(updatedFilm);
  };

  #renderFilm = (film = {}) => {
    this.#filmListContainer =
      this.#filmsContainerComponent.element.querySelector('.films-list__container');

    const filmPresenter = new FilmPresenter({
      filmsListContainer: this.#filmListContainer,
      changeData: this.#handleFilmChange,
    });

    filmPresenter.init(film);
    this.#filmPresenter.set(film.id, filmPresenter);
  };

  #renderFilms = (from, to) => {
    this.#filmItems.slice(from, to).forEach((film) => this.#renderFilm(film));
  };

  #renderFilmList = () => {
    this.#renderFilms(0, Math.min(this.#filmItems.length, FILM_COUNT_PER_STEP));
  };

  #renderStub = () => {
    this.#filmsEmptyComponent = new EmptyListView();

    render(this.#filmsEmptyComponent, this.#filmList, RenderPosition.AFTERBEGIN);
  };

  #renderShowMoreButton = () => {
    this.#showMoreButtonComponent = new ShowMoreButtonView({ onClick: this.#handleShowMoreClick });

    render(this.#showMoreButtonComponent, this.#filmList);
  };

  #renderExtraFilms = (extraInfo = [], container = {}) => {
    for (const extra of extraInfo) {
      render(new FilmCardView({ film: extra }), container);
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

  #renderTopRated = () => {
    this.#filmsTopRatedComponent = new FilmsExtraView('Top Rated');
    this.#filmsTopRatedContainer =
      this.#filmsTopRatedComponent.element.querySelector('.films-list__container');
    this.#topRatedFilms = this.#filterFilmsBy('filmInfo', 'totalRating');

    render(this.#filmsTopRatedComponent, this.#filmsContainerComponent.element);
    this.#renderExtraFilms(this.#topRatedFilms, this.#filmsTopRatedContainer);
  };

  #renderMostCommented = () => {
    this.#filmsMostCommentedComponent = new FilmsExtraView('Most Commented');
    this.#filmsMostCommentedContainer =
      this.#filmsMostCommentedComponent.element.querySelector('.films-list__container');
    this.#mostCommentedFilms = this.#filterFilmsBy('comments', 'length');

    render(this.#filmsMostCommentedComponent, this.#filmsContainerComponent.element);
    this.#renderExtraFilms(this.#mostCommentedFilms, this.#filmsMostCommentedContainer);
  };

  init = (container) => {
    this.#filmList = this.#filmsContainerComponent.element.querySelector('.films-list');

    render(this.#filmsContainerComponent, container);

    if (!this.#filmItems.length) {
      this.#renderStub();

      return;
    }

    this.#renderFilters(this.#filtersModel);
    this.#renderFilmList();
    this.#renderTopRated();
    this.#renderMostCommented();

    if (this.#filmItems.length > FILM_COUNT_PER_STEP) {
      this.#renderShowMoreButton();
    }
  };
}
