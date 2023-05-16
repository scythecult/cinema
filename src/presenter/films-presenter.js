import { Mode, SortType, UpdateType, UserActions } from '../const';
import { remove, render, RenderPosition } from '../framework/render';
import { sortFilmsBy } from '../utils/common';
import { sortByRating, sortByReleaseDate } from '../utils/film';
import { filter } from '../utils/filter';
import FilmsContainerView from '../view/films-container-view';
import FilmsExtraView from '../view/films-extra-view';
import EmptyListView from '../view/list-empty-view';
import PopupView from '../view/popup-view';
import ShowMoreButtonView from '../view/show-more-button-view';
import SortView from '../view/sort-view';
import FilmPresenter from './film-presenter';

const FILM_COUNT_PER_STEP = 5;
export default class FilmsPresenter {
  #MODE = Mode.DEFAULT;
  #scrollPosition = 0;
  #filmsModel = null;
  #filterModel = null;
  #commentsModel = null;
  #filmItems = null;
  #filmSourceItems = null;
  #filmPresenter = new Map();
  #commentItems = null;

  #popupContainer = document.body;
  #filmList = null;
  #filmListContainer = null;
  #filmsTopRatedContainer = null;
  #filmsMostCommentedContainer = null;

  #topRatedFilms = null;
  #mostCommentedFilms = null;
  #renderedFilmCount = FILM_COUNT_PER_STEP;

  #mainContainer = null;
  #filmsContainerComponent = new FilmsContainerView();
  #sortComponent = null;
  #filmsEmptyComponent = null;
  #showMoreButtonComponent = null;
  #filmsTopRatedComponent = null;
  #filmsMostCommentedComponent = null;
  #popupComponent = null;

  #currentSortType = SortType.DEFAULT;

  constructor({ container, filmsModel = {}, filterModel = {}, commentsModel = {} }) {
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#filterModel = filterModel;

    this.#mainContainer = container;

    this.#filmsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
    this.#commentItems = [...this.#commentsModel.comments];

    this.updateScrollPosition = this.updateScrollPosition.bind(this);
  }

  get films() {
    const filterType = this.#filterModel.filter;
    const films = this.#filmsModel.films;
    const filteredFilms = filter[filterType](films);

    switch (this.#currentSortType) {
      case SortType.BY_DATE:
        return filteredFilms.sort(sortByReleaseDate);
      case SortType.BY_RATING:
        return filteredFilms.sort(sortByRating);
    }

    return filteredFilms;
  }

  get scrollPosition() {
    return this.#scrollPosition;
  }

  updateScrollPosition(newPosition) {
    this.#scrollPosition = newPosition;
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserActions.UPDATE:
        this.#filmsModel.update(updateType, update);
        break;
      case UserActions.ADD_COMMENT:
        // eslint-disable-next-line no-console
        console.log('comment model action add');
        break;
      case UserActions.DELETE_COMMENT:
        // eslint-disable-next-line no-console
        console.log('comment model action delete');
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        if (this.#MODE === Mode.POPUP) {
          this.#removePopup();
          this.#renderPopup(data);
        }

        this.#filmPresenter.get(data.id).init(data);
        break;

      case UpdateType.MINOR:
        // eslint-disable-next-line no-console
        console.log('update then delete comment');
        break;

      case UpdateType.MAJOR:
        this.#clearFilmList();
        this.#renderFilmList();
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

  #handleCloseClick = () => {
    this.#removePopup();
  };

  #handleCommentsChange = (newComment = {}, film = {}) => {
    this.#commentItems = [...this.#commentItems, newComment];

    this.#removePopup();
    this.#renderPopup(film);
  };

  #removePopup = () => {
    this.#MODE = Mode.DEFAULT;
    this.#popupComponent.removeOverflow();

    remove(this.#popupComponent);
  };

  #renderPopup = (film) => {
    this.#MODE = Mode.POPUP;

    this.#popupComponent = new PopupView({
      film,
      comments: this.#commentItems,
      scrollPosition: this.scrollPosition,
      onCloseClick: this.#handleCloseClick,
      onKeydown: this.#handleCloseClick,
      changeData: this.#handleViewAction,
      updateScrollPosition: this.updateScrollPosition,
      changeCommentsData: this.#handleCommentsChange,
    });

    this.#popupComponent.addOverflow();

    render(this.#popupComponent, this.#popupContainer);
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
      filmsListContainer: container,
      changeData: this.#handleViewAction,
      renderPopup: this.#renderPopup,
    });

    filmPresenter.init(film);
    this.#filmPresenter.set(film.id, filmPresenter);
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
    this.#filmsEmptyComponent = new EmptyListView();

    render(this.#filmsEmptyComponent, this.#filmList, RenderPosition.AFTERBEGIN);
  };

  #renderShowMoreButton = () => {
    this.#showMoreButtonComponent = new ShowMoreButtonView({ onClick: this.#handleShowMoreClick });

    if (this.films.length > FILM_COUNT_PER_STEP) {
      render(this.#showMoreButtonComponent, this.#filmList);
    }
  };

  #renderExtraFilms = (extraInfo = [], container = {}) => {
    for (const extra of extraInfo) {
      this.#renderFilm(extra, container);
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

  #renderTopRated = () => {
    this.#filmsTopRatedComponent = new FilmsExtraView('Top Rated');
    this.#filmsTopRatedContainer = this.#filmsTopRatedComponent.element.querySelector('.films-list__container');
    this.#topRatedFilms = sortFilmsBy(this.#filmItems, 'filmInfo', 'totalRating', 2);

    render(this.#filmsTopRatedComponent, this.#filmsContainerComponent.element);
    this.#renderExtraFilms(this.#topRatedFilms, this.#filmsTopRatedContainer);
  };

  #renderMostCommented = () => {
    this.#filmsMostCommentedComponent = new FilmsExtraView('Most Commented');
    this.#filmsMostCommentedContainer =
      this.#filmsMostCommentedComponent.element.querySelector('.films-list__container');
    this.#mostCommentedFilms = sortFilmsBy(this.#filmItems, 'commentIds', 'length', 2);

    render(this.#filmsMostCommentedComponent, this.#filmsContainerComponent.element);
    this.#renderExtraFilms(this.#mostCommentedFilms, this.#filmsMostCommentedContainer);
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
    // this.#renderTopRated();
    // this.#renderMostCommented();
  };
}
