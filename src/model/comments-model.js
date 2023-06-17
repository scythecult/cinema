import Observable from '../framework/observable';

export default class CommentsModel extends Observable {
  #apiService = null;
  #comments = [];

  constructor(apiService) {
    super();
    this.#apiService = apiService;
  }

  get comments() {
    return this.#comments;
  }

  init = async (filmId) => {
    try {
      this.#comments = await this.#apiService.getComments(filmId);
    } catch (error) {
      this.#comments = [];
    }

    return this.#comments;
  };

  addComment(updateType, update) {
    const { film: currentFilm, comment } = update;

    this.#comments = [...this.#comments, comment];

    this._notify(updateType, currentFilm);
  }
}
