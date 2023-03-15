import { render } from '../framework/render';
import FilmCardView from '../view/film-card-view';
import PopupPresenter from './popup-presenter';

export default class FilmPresenter {
  #filmListContainer = null;
  #popupContainer = document.body;

  #selectedFilm = null;

  #filmComponent = null;
  #popupPresenter = null;

  constructor(filmsListContainer) {
    this.#filmListContainer = filmsListContainer;
  }

  #handleClick = () => {
    this.#popupPresenter.init(this.#popupContainer);
    document.addEventListener('keydown', this.#handleKeydown);
  };

  #handleKeydown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();

      this.#popupPresenter.destroy();

      document.removeEventListener('keydown', this.#handleKeydown);
    }
  };

  init = (selectedFilm) => {
    this.#selectedFilm = selectedFilm;

    this.#filmComponent = new FilmCardView(this.#selectedFilm);
    this.#popupPresenter = new PopupPresenter(this.#selectedFilm, this.#handleKeydown);

    this.#filmComponent.setClickHandler(this.#handleClick);

    render(this.#filmComponent, this.#filmListContainer);
  };
}
