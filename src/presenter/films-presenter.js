import { FilterType, SortType, StubText, UpdateType, UserActions } from '../const';
import { remove, render, RenderPosition, replace } from '../framework/render';
import { sortByRating, sortByReleaseDate } from '../utils/film';
import { filter } from '../utils/filter';
import FilmsContainerView from '../view/films-container-view';
import StubView from '../view/stub-view';
import ShowMoreButtonView from '../view/show-more-button-view';
import SortView from '../view/sort-view';
import FilmPresenter from './film-presenter';

const FILM_COUNT_PER_STEP = 5;
export default class FilmsPresenter {
  #filmsModel = null;
  #filterModel = null;
  #commentsModel = null;
  #filmPresenter = new Map();

  #filmList = null;
  #filmListContainer = null;

  #mainContainer = null;
  #filmsContainerComponent = new FilmsContainerView();
  #sortComponent = null;
  #stubComponent = null;
  #showMoreButtonComponent = null;

  #renderedFilmCount = FILM_COUNT_PER_STEP;
  #currentSortType = SortType.DEFAULT;

  constructor({ container, filmsModel = {}, filterModel = {}, commentsModel = {} }) {
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#filterModel = filterModel;

    this.#mainContainer = container;

    this.#filmsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
    this.#commentsModel.addObserver(this.#handleModelEvent);
  }

  get comments() {
    return this.#commentsModel.comments;
  }

  get films() {
    const filteredFilms = this.#getFilteredFilms();

    switch (this.#currentSortType) {
      case SortType.BY_DATE:
        return filteredFilms.sort(sortByReleaseDate);
      case SortType.BY_RATING:
        return filteredFilms.sort(sortByRating);
    }

    return filteredFilms;
  }

  #getFilteredFilms = () => {
    const filterType = this.#filterModel.filter;
    const films = this.#filmsModel.films;

    return filter[filterType](films);
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserActions.UPDATE:
        this.#filmsModel.update(updateType, update);
        break;
      case UserActions.ADD_COMMENT:
        this.#filmsModel.addComment(updateType, update);
        this.#commentsModel.addComment(updateType, update);
        break;
      case UserActions.DELETE_COMMENT:
        this.#filmsModel.removeComment(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        if (FilterType.ALL !== this.#filterModel.filter) {
          this.#clearFilmList();
          this.#renderFilmList();
          this.#renderStub();

          return;
        }
        this.#filmPresenter.get(data.id).init(data, this.comments);
        break;

      case UpdateType.MINOR:
        break;

      case UpdateType.MAJOR:
        this.#clearFilmList();
        this.#renderFilmList();
        this.#renderStub();
        break;
    }
  };

  #handleSortTypeChange = (newSortType) => {
    if (this.#currentSortType === newSortType) {
      return;
    }

    this.#currentSortType = newSortType;

    this.#clearFilmList();
    this.#renderFilmList();
  };

  #renderSort = (currentSortType) => {
    this.#sortComponent = new SortView({
      currentSortType,
      onSortTypeChange: this.#handleSortTypeChange,
    });

    render(this.#sortComponent, this.#filmsContainerComponent.element, RenderPosition.BEFOREBEGIN);
  };

  #renderFilm = (film = {}, container = {}) => {
    const filmPresenter = new FilmPresenter({
      container,
      changeData: this.#handleViewAction,
    });

    this.#filmPresenter.set(film.id, filmPresenter);
    filmPresenter.init(film, this.comments);
  };

  #renderFilms = (films) => {
    films.forEach((film) => this.#renderFilm(film, this.#filmListContainer));
  };

  #renderFilmList = () => {
    const filmsCount = this.films.length;
    const films = this.films.slice(0, Math.min(filmsCount, FILM_COUNT_PER_STEP));

    this.#renderSort(this.#currentSortType);
    this.#renderFilms(films);
    this.#renderShowMoreButton();
  };

  #clearFilmList = () => {
    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();
    this.#renderedFilmCount = FILM_COUNT_PER_STEP;
    remove(this.#showMoreButtonComponent);
    remove(this.#sortComponent);
  };

  #renderStub = () => {
    const filteredFilms = this.#getFilteredFilms();
    let textContent = '';

    switch (this.#filterModel.filter) {
      case FilterType.WATCHLIST:
        if (!filteredFilms.length) {
          textContent = StubText.WATCHLIST;
        }
        break;
      case FilterType.HISTORY:
        if (!filteredFilms.length) {
          textContent = StubText.HISTORY;
        }
        break;
      case FilterType.FAVORITE:
        if (!filteredFilms.length) {
          textContent = StubText.FAVORITES;
        }
        break;
    }

    if (!textContent) {
      return;
    }

    const prevStubComponent = this.#stubComponent;
    this.#stubComponent = new StubView(textContent);

    if (prevStubComponent === null) {
      render(this.#stubComponent, this.#filmList, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this.#stubComponent, prevStubComponent);
    remove(prevStubComponent);
  };

  #renderShowMoreButton = () => {
    this.#showMoreButtonComponent = new ShowMoreButtonView({ onClick: this.#handleShowMoreClick });

    if (this.films.length > FILM_COUNT_PER_STEP) {
      render(this.#showMoreButtonComponent, this.#filmList);
    }
  };

  #handleShowMoreClick = () => {
    const filmsCount = this.films.length;
    const newRenderedFilmCount = Math.min(filmsCount, this.#renderedFilmCount + FILM_COUNT_PER_STEP);
    const films = this.films.slice(this.#renderedFilmCount, newRenderedFilmCount);

    this.#renderFilms(films);
    this.#renderedFilmCount = newRenderedFilmCount;

    if (this.#renderedFilmCount >= filmsCount) {
      remove(this.#showMoreButtonComponent);
    }
  };

  init = () => {
    this.#filmList = this.#filmsContainerComponent.element.querySelector('.films-list');
    this.#filmListContainer = this.#filmsContainerComponent.element.querySelector('.films-list__container');

    render(this.#filmsContainerComponent, this.#mainContainer);

    if (!this.films.length) {
      this.#renderStub();
      return;
    }

    this.#renderFilmList();
  };
}
