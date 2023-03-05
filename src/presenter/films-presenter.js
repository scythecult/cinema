import { render } from '../render';
import FilmCardView from '../view/film-card-view';
import FilmsContainerView from '../view/films-container-view';
import FilmsExtraView from '../view/films-extra-view';
import ShowMoreButtonView from '../view/show-more-button-view';
import PopupPresenter from './popup-presenter';

export default class FilmsPresenter {
  #filmsModel = null;

  #popupContainer = document.body;
  #filmList = null;
  #filmListContainer = null;
  #filmsTopRatedContainer = null;
  #filmsMostCommentedContainer = null;
  #topRatedFilms = null;
  #mostCommentedFilms = null;

  #filmsContainer = new FilmsContainerView();
  #filmsTopRated = new FilmsExtraView('Top Rated');
  #filmsMostCommented = new FilmsExtraView('Most Commented');
  #popupPresenter = new PopupPresenter(this.#popupContainer);

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

  findFilmById = (filmId) =>
    this.filmItems.find((film) => parseInt(film.id, 10) === parseInt(filmId, 10));

  handleFilmCardClick = (evt) => {
    const filmCardElement = evt.target.closest('.film-card');

    if (!filmCardElement) {
      return;
    }

    const { filmId } = filmCardElement.dataset;
    const selectedFilm = this.findFilmById(filmId);

    this.addOverflow();
    this.#popupPresenter.init(selectedFilm);
    document.addEventListener('keydown', this.handleDocumentEscapeKeydown);
  };

  handlePopupCloseClick = (evt) => {
    const popupCloseElement = evt.target.closest('.film-details__close-btn');

    if (!popupCloseElement) {
      return;
    }

    this.#popupPresenter.destroy();
    this.removeOverflow();
    document.removeEventListener('keydown', this.handleDocumentEscapeKeydown);
  };

  handleDocumentEscapeKeydown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();

      this.#popupPresenter.destroy();
      this.removeOverflow();
      document.removeEventListener('keydown', this.handleDocumentEscapeKeydown);
    }
  };

  addOverflow = () => {
    this.#popupContainer.classList.add('hide-overflow');
  };

  removeOverflow = () => {
    this.#popupContainer.classList.remove('hide-overflow');
  };

  init = (container) => {
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

    this.#filmsContainer.element.addEventListener('click', this.handleFilmCardClick);
    this.#popupContainer.addEventListener('click', this.handlePopupCloseClick);
  };
}
