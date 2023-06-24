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

  getComments = async (filmId) => {
    try {
      this.#comments = await this.#apiService.getComments(filmId);
    } catch (error) {
      this.#comments = [];
    }

    return this.#comments;
  };

  addComment = async (updateType, update) => {
    const { film: currentFilm, comment } = update;
    const newComment = { filmId: currentFilm.id, comment };

    try {
      const response = await this.#apiService.addComment(newComment);
      const { movie, comments } = response;
      const adaptedFilm = this.#adaptToClient(movie);

      this.#comments = comments;

      this._notify(updateType, adaptedFilm);
    } catch (error) {
      throw new Error('Cant add comment');
    }
  };

  removeComment = async (updateType, update) => {
    const { film: currentFilm, commentId } = update;
    const commentIndex = this.comments.findIndex((comment) => String(comment.id) === String(commentId));

    if (commentIndex === -1) {
      throw new Error('Cant delete unexisted comment');
    }

    try {
      await this.#apiService.deleteComment(commentId);

      this.#comments = [...this.#comments.slice(0, commentIndex), ...this.#comments.slice(commentIndex + 1)];

      this._notify(updateType, currentFilm);
    } catch (error) {
      throw new Error('Cant delete comment');
    }
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
}
