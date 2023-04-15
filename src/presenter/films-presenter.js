import { SortType } from '../const';
import { remove, render, RenderPosition } from '../framework/render';
import { sortFilmsBy, updateItem } from '../utils/common';
import { sortByRating, sortByReleaseDate } from '../utils/film';
// import FilmCardView from '../view/film-card-view';
import FilmsContainerView from '../view/films-container-view';
import FilmsExtraView from '../view/films-extra-view';
import EmptyListView from '../view/list-empty-view';
import PopupView from '../view/popup-view';
import ShowMoreButtonView from '../view/show-more-button-view';
import SortView from '../view/sort-view';
import FilmPresenter from './film-presenter';
// import PopupPresenter from './popup-presenter';

const FILM_COUNT_PER_STEP = 5;
export default class FilmsPresenter {
  #filmsModel = null;
  #filtersModel = null;
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

  #filmFiltersPresenter = null;
  #filmsContainerComponent = new FilmsContainerView();
  #sortComponent = null;
  #filmsEmptyComponent = null;
  #showMoreButtonComponent = null;
  #filmsTopRatedComponent = null;
  #filmsMostCommentedComponent = null;
  #popupComponent = null;

  #currentSortType = SortType.DEFAULT;

  constructor({ filmsModel = {}, filtersModel = {}, commentsModel = {} }) {
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#filtersModel = filtersModel;
    this.#filmItems = [...this.#filmsModel.films];
    this.#filmSourceItems = [...this.#filmsModel.films];
    this.#commentItems = [...this.#commentsModel.comments];
  }

  #handleFilmChange = (updatedFilm) => {
    this.#filmItems = updateItem(this.#filmItems, updatedFilm);
    this.#filmSourceItems = updateItem(this.#filmSourceItems, updatedFilm);
    this.#filmPresenter.get(updatedFilm.id)?.init(updatedFilm);
  };

  #sortFilms = (newSortType) => {
    this.#currentSortType = newSortType;

    switch (newSortType) {
      case SortType.DEFAULT:
        this.#filmItems = [...this.#filmSourceItems];
        break;
      case SortType.BY_DATE:
        this.#filmItems.sort(sortByReleaseDate);
        break;
      case SortType.BY_RATING:
        this.#filmItems.sort(sortByRating);
        break;
    }
  };

  #handleSortTypeChange = (newSortType) => {
    if (this.#currentSortType === newSortType) {
      return;
    }

    this.#sortFilms(newSortType);
    this.#updateSort();
    this.#clearFilmList();
    this.#renderFilmList();
    this.#renderShowMoreButton();
  };

  #updateSort = () => {
    remove(this.#sortComponent);

    this.#renderSort(this.#currentSortType);
  };

  #renderSort = (currentSortType) => {
    this.#sortComponent = new SortView({
      currentSortType,
      onSortTypeChange: this.#handleSortTypeChange,
    });

    render(this.#sortComponent, this.#filmsContainerComponent.element, RenderPosition.BEFOREBEGIN);
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
    this.#popupComponent.removeOverflow();

    remove(this.#popupComponent);
  };

  #renderPopup = (film) => {
    this.#popupComponent = new PopupView({
      film,
      comments: this.#commentItems,
      onCloseClick: this.#handleCloseClick,
      onKeydown: this.#handleCloseClick,
      changeData: this.#handleFilmChange,
      changeCommentsData: this.#handleCommentsChange,
    });

    this.#popupComponent.addOverflow();

    render(this.#popupComponent, this.#popupContainer);
  };

  #renderFilm = (film = {}, container = {}) => {
    const filmPresenter = new FilmPresenter({
      filmsListContainer: container,
      changeData: this.#handleFilmChange,
      renderPopup: this.#renderPopup,
    });

    filmPresenter.init(film);
    this.#filmPresenter.set(film.id, filmPresenter);
  };

  #renderFilms = (from, to) => {
    this.#filmItems.slice(from, to).forEach((film) => this.#renderFilm(film, this.#filmListContainer));
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

    if (this.#filmItems.length > FILM_COUNT_PER_STEP) {
      render(this.#showMoreButtonComponent, this.#filmList);
    }
  };

  #renderExtraFilms = (extraInfo = [], container = {}) => {
    for (const extra of extraInfo) {
      this.#renderFilm(extra, container);
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

  init = (container) => {
    this.#filmList = this.#filmsContainerComponent.element.querySelector('.films-list');
    this.#filmListContainer = this.#filmsContainerComponent.element.querySelector('.films-list__container');

    render(this.#filmsContainerComponent, container);

    if (!this.#filmItems.length) {
      this.#renderStub();

      return;
    }

    this.#renderSort(this.#currentSortType);
    this.#renderFilmList();
    this.#renderTopRated();
    this.#renderMostCommented();
    this.#renderShowMoreButton();
  };
}
