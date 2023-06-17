import { UpdateType } from '../const';
import Observable from '../framework/observable';

export default class FilmsModel extends Observable {
  #apiService = null;
  #films = null;

  constructor(apiService) {
    super();
    this.#apiService = apiService;
    this.#films = [];
  }

  get films() {
    return this.#films;
  }

  init = async () => {
    try {
      const films = await this.#apiService.getFilms();
      this.#films = films.map(this.#adaptToClient);
    } catch (error) {
      this.#films = [];
    }

    this._notify(UpdateType.INIT);
  };

  #adaptToClient = (rawFilm) => {
    const filmInfo = {
      ...rawFilm['film_info'],
      ageRating: rawFilm['film_info']['age_rating'],
      alternativeTitle: rawFilm['film_info']['alternative_title'],
      totalRating: rawFilm['film_info']['total_rating'],
      release: {
        date: rawFilm['film_info'].release.date,
        releaseCountry: rawFilm['film_info'].release['release_country'],
      },
    };

    delete filmInfo.release['release_country'];
    delete filmInfo['age_rating'];
    delete filmInfo['alternative_title'];
    delete filmInfo['total_rating'];

    const userDetails = {
      ...rawFilm['user_details'],
      alreadyWatched: rawFilm['user_details']['already_watched'],
      watchingDate: rawFilm['user_details']['watching_date'],
    };

    delete userDetails['already_watched'];
    delete userDetails['watching_date'];

    const adaptedFilm = {
      ...rawFilm,
      commentIds: rawFilm.comments,
      filmInfo,
      userDetails,
    };

    delete adaptedFilm.comments;
    delete adaptedFilm['film_info'];
    delete adaptedFilm['user_details'];

    return adaptedFilm;
  };

  update = async (updateType, update) => {
    const filmIndex = this.#films.findIndex((item) => item.id === update.id);

    if (filmIndex === -1) {
      throw new Error('Cant update unexisting film');
    }

    try {
      const response = await this.#apiService.updateFilm(update);
      const updatedFilm = this.#adaptToClient(response);

      this.#films = [...this.#films.slice(0, filmIndex), updatedFilm, ...this.#films.slice(filmIndex + 1)];

      this._notify(updateType, updatedFilm);
    } catch (error) {
      throw new Error('Cant update film');
    }
  };

  addComment = (updateType, update) => {
    const { film: currentFilm, comment } = update;
    const filmIndex = this.films.findIndex((film) => String(film.id) === String(currentFilm.id));

    if (filmIndex !== -1) {
      const targetFilm = this.films[filmIndex];
      const updatedFilm = {
        ...targetFilm,
        commentIds: [...targetFilm.commentIds, String(comment.id)],
      };

      this.films[filmIndex] = updatedFilm;

      this._notify(updateType, updatedFilm);
    }
  };

  removeComment = (updateType, update) => {
    const { film: currentFilm, commentId } = update;
    const filmIndex = this.films.findIndex((film) => String(film.id) === String(currentFilm.id));

    if (filmIndex !== -1) {
      const targetFilm = this.films[filmIndex];
      const updatedFilm = {
        ...targetFilm,
        commentIds: targetFilm.commentIds.filter((id) => String(id) !== String(commentId)),
      };

      this.films[filmIndex] = updatedFilm;

      this._notify(updateType, updatedFilm);
    }
  };
}
