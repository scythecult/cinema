import { FilterType, SortType, UpdateType, UserActions } from '../const';
import { remove, render, RenderPosition } from '../framework/render';
import { sortByCommentCount, sortByRating, sortByReleaseDate } from '../utils/film';
import { filter } from '../utils/filter';
import FilmsContainerView from '../view/films-container-view';
import StubView from '../view/stub-view';
import ShowMoreButtonView from '../view/show-more-button-view';
import SortView from '../view/sort-view';
import FilmPresenter from './film-presenter';
import LoaderView from '../view/loader-view';
import UiBlocker from '../framework/ul-blocker/ui-blocker';
import FilmsExtraView from '../view/films-extra-view';
import StatsView from '../view/stats-view';

const FILM_COUNT_PER_STEP = 5;
const MAX_EXTRA_FILMS_COUNT = 2;
const ExtraFilm = {
  TOP_RATED: 'Top Rated',
  MOST_COMMENTED: 'Most Commented',
};
const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};
export default class FilmsPresenter {
  #filmsModel = null;
  #filterModel = null;
  #commentsModel = null;
  #filmPresenter = new Map();
  #extraFilmPresenter = new Map();

  #filmList = null;
  #filmListContainer = null;

  #profileContainer = null;
  #mainContainer = null;
  #footerContainer = null;
  #filmsContainerComponent = new FilmsContainerView();
  #loadingComponent = new LoaderView();
  #sortComponent = null;
  #stubComponent = null;
  #showMoreButtonComponent = null;
  #mostCommmentedFilmComponent = null;
  #topRatedFilmComponent = null;
  #uiBlocker = new UiBlocker(TimeLimit.LOWER_LIMIT, TimeLimit.UPPER_LIMIT);

  #renderedFilmCount = FILM_COUNT_PER_STEP;
  #currentSortType = SortType.DEFAULT;
  #filterType = FilterType.ALL;
  #isLoading = true;

  constructor({
    profileContainer,
    filmContainer,
    footerContainer,
    filmsModel = {},
    filterModel = {},
    commentsModel = {},
  }) {
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#filterModel = filterModel;

    this.#profileContainer = profileContainer;
    this.#mainContainer = filmContainer;
    this.#footerContainer = footerContainer;

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

  get mostCommentedFilms() {
    return this.#filmsModel.films.sort(sortByCommentCount).slice(0, MAX_EXTRA_FILMS_COUNT);
  }

  get topRatedFilms() {
    return this.#filmsModel.films.sort(sortByRating).slice(0, MAX_EXTRA_FILMS_COUNT);
  }

  #getFilteredFilms = () => {
    this.#filterType = this.#filterModel.filter;
    const films = this.#filmsModel.films;

    return filter[this.#filterType](films);
  };

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserActions.UPDATE:
        try {
          await this.#filmsModel.update(updateType, update);
        } catch (error) {
          this.#filmPresenter.get(update.id)?.setDefault();
          this.#extraFilmPresenter.get(update.id)?.setDefault();
        }
        break;
      case UserActions.ADD_COMMENT:
        this.#filmPresenter.get(update.film.id)?.setAdding();
        this.#extraFilmPresenter.get(update.film.id)?.setAdding();

        try {
          await this.#commentsModel.addComment(updateType, update).then(() => {
            this.#filmPresenter.get(update.film.id)?.setDefault();
            this.#extraFilmPresenter.get(update.film.id)?.setDefault();
          });
        } catch (error) {
          this.#filmPresenter.get(update.film.id)?.setDefault();
          this.#extraFilmPresenter.get(update.film.id)?.setDefault();
        }

        break;
      case UserActions.DELETE_COMMENT:
        this.#filmPresenter.get(update.film.id)?.setDeleting(update.commentId);
        this.#extraFilmPresenter.get(update.film.id)?.setDeleting(update.commentId);

        try {
          await this.#commentsModel.removeComment(updateType, update).then(() => {
            this.#filmsModel.removeComment(updateType, update);
          });
        } catch (error) {
          this.#filmPresenter.get(update.film.id)?.setDefault();
          this.#extraFilmPresenter.get(update.film.id)?.setDefault();
        }
        break;
    }

    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        if (FilterType.ALL !== this.#filterModel.filter) {
          this.#clearFilmList();
          this.#renderFilmList();

          return;
        }

        this.#filmPresenter.get(data.id)?.init(data);
        this.#extraFilmPresenter.get(data.id)?.init(data);
        break;

      case UpdateType.MINOR:
        break;

      case UpdateType.MAJOR:
        this.#clearFilmList();
        this.#renderFilmList();
        break;
      case UpdateType.INIT:
        if (this.#isLoading) {
          this.#isLoading = false;
          remove(this.#loadingComponent);
        }

        this.#renderFilmList();
        this.#renderStats(this.films.length);
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

  #renderStats = (filmsCount) => {
    render(new StatsView(filmsCount), this.#footerContainer);
  };

  #removeExtraFilms = () => {
    this.#extraFilmPresenter.forEach((presenter) => presenter.destroy());
    this.#extraFilmPresenter.clear();

    remove(this.#mostCommmentedFilmComponent);
    remove(this.#topRatedFilmComponent);
  };

  #renderMostCommentedFilms = () => {
    this.#mostCommmentedFilmComponent = new FilmsExtraView(ExtraFilm.MOST_COMMENTED);
    const filmsContainer = this.#mostCommmentedFilmComponent.element.querySelector('.films-list__container');

    render(this.#mostCommmentedFilmComponent, this.#filmsContainerComponent.element, RenderPosition.BEFOREEND);
    this.mostCommentedFilms.forEach((film) => this.#renderFilm(film, filmsContainer, this.#extraFilmPresenter));
  };

  #renderTopRatedFilms = () => {
    this.#topRatedFilmComponent = new FilmsExtraView(ExtraFilm.TOP_RATED);
    const filmsContainer = this.#topRatedFilmComponent.element.querySelector('.films-list__container');

    render(this.#topRatedFilmComponent, this.#filmsContainerComponent.element, RenderPosition.BEFOREEND);
    this.topRatedFilms.forEach((film) => this.#renderFilm(film, filmsContainer, this.#extraFilmPresenter));
  };

  #renderExtraFilms = () => {
    this.#renderTopRatedFilms();
    this.#renderMostCommentedFilms();
  };

  #renderFilm = (film = {}, container = {}, storage = this.#filmPresenter) => {
    const filmPresenter = new FilmPresenter({
      container,
      changeData: this.#handleViewAction,
      commentsModel: this.#commentsModel,
    });

    // this.#filmPresenter.set(film.id, filmPresenter);
    storage.set(film.id, filmPresenter);
    filmPresenter.init(film);
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
    this.#renderStub();
    this.#renderExtraFilms();
  };

  #clearFilmList = () => {
    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();
    this.#renderedFilmCount = FILM_COUNT_PER_STEP;
    remove(this.#showMoreButtonComponent);
    remove(this.#sortComponent);
    remove(this.#stubComponent);
    this.#removeExtraFilms();
  };

  #renderStub = () => {
    if (!this.#getFilteredFilms().length) {
      this.#stubComponent = new StubView(this.#filterType);

      render(this.#stubComponent, this.#filmList, RenderPosition.AFTERBEGIN);
    }
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

    if (this.#isLoading) {
      render(this.#loadingComponent, this.#filmList);
    }

    render(this.#filmsContainerComponent, this.#mainContainer);
  };
}
