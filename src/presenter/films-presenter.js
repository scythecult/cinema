import { render, RenderPosition } from '../render';
import FilmCardView from '../view/film-card-view';
import FilmsContainerView from '../view/films-container-view';
import FilmsExtraView from '../view/films-extra-view';
import EmptyListView from '../view/list-empty-view';
import ShowMoreButtonView from '../view/show-more-button-view';
import FiltersPresenter from './filters-presenter';
import PopupPresenter from './popup-presenter';

const FILM_COUNT_PER_STEP = 5;
export default class FilmsPresenter {
  #filmsModel = {};
  #filmItems = [];
  #filtersModel = {};

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
  #filmsEmptyComponent = new EmptyListView();
  #showMoreButtonComponent = new ShowMoreButtonView();
  #filmsTopRatedComponent = new FilmsExtraView('Top Rated');
  #filmsMostCommentedComponent = new FilmsExtraView('Most Commented');
  #popupPresenter = null;

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

  #findFilmById = (filmId) =>
    this.#filmItems.find((film) => parseInt(film.id, 10) === parseInt(filmId, 10));

  #handleFilmCardClick = (evt) => {
    const filmCardElement = evt.target.closest('.film-card');

    if (!filmCardElement) {
      return;
    }

    const { filmId } = filmCardElement.dataset;
    const selectedFilm = this.#findFilmById(filmId);

    this.#addOverflow();
    this.#renderPopup(selectedFilm);
    document.addEventListener('keydown', this.#handleDocumentKeydown);
  };

  #handlePopupCloseClick = (evt) => {
    const popupCloseElement = evt.target.closest('.film-details__close-btn');

    if (!popupCloseElement) {
      return;
    }

    this.#popupPresenter.destroy();
    this.#removeOverflow();
    document.removeEventListener('keydown', this.#handleDocumentKeydown);
  };

  #handleDocumentKeydown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();

      this.#popupPresenter.destroy();
      this.#removeOverflow();
      document.removeEventListener('keydown', this.#handleDocumentKeydown);
    }
  };

  #renderFilters(filtersModel) {
    this.#filmFiltersPresenter = new FiltersPresenter(filtersModel);

    this.#filmFiltersPresenter.init(this.#filmList);
  }

  #renderPopup(selectedFilm) {
    this.#popupPresenter = new PopupPresenter(selectedFilm);

    this.#popupPresenter.init(this.#popupContainer);
  }

  #renderFilm(film = {}) {
    render(new FilmCardView(film), this.#filmListContainer);
  }

  #renderFilms() {
    for (let i = 0; i < Math.min(this.#filmItems.length, FILM_COUNT_PER_STEP); i++) {
      this.#renderFilm(this.#filmItems[i]);
    }
  }

  #renderStab() {
    render(this.#filmsEmptyComponent, this.#filmList, RenderPosition.AFTERBEGIN);
  }

  #handleShowMoreClick = () => {
    this.#filmItems
      .slice(this.#renderedFilmCount, this.#renderedFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => this.#renderFilm(film));

    this.#renderedFilmCount += FILM_COUNT_PER_STEP;

    if (this.#renderedFilmCount >= this.#filmItems.length) {
      this.#showMoreButtonComponent.element.remove();
      this.#showMoreButtonComponent.removeElement();
    }
  };

  #addOverflow = () => {
    this.#popupContainer.classList.add('hide-overflow');
  };

  #removeOverflow = () => {
    this.#popupContainer.classList.remove('hide-overflow');
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
      this.#renderStab();

      return;
    }

    this.#renderFilters(this.#filtersModel);

    this.#renderFilms();

    if (this.#filmItems.length > FILM_COUNT_PER_STEP) {
      render(this.#showMoreButtonComponent, this.#filmList);
      this.#showMoreButtonComponent.element.addEventListener('click', this.#handleShowMoreClick);
    }

    render(this.#filmsTopRatedComponent, this.#filmsContainerComponent.element);
    render(this.#filmsMostCommentedComponent, this.#filmsContainerComponent.element);

    for (const topRated of this.#topRatedFilms) {
      render(new FilmCardView(topRated), this.#filmsTopRatedContainer);
    }

    for (const mostCommented of this.#mostCommentedFilms) {
      render(new FilmCardView(mostCommented), this.#filmsMostCommentedContainer);
    }

    this.#filmsContainerComponent.element.addEventListener('click', this.#handleFilmCardClick);
    this.#popupContainer.addEventListener('click', this.#handlePopupCloseClick);
  };
}
