import ApiService from './framework/api-service';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

export default class FilmApiService extends ApiService {
  getFilms = () => this._load({ url: 'movies' }).then(ApiService.parseResponse);

  getComments = (filmId) => this._load({ url: `comments/${filmId}` }).then(ApiService.parseResponse);

  updateFilm = async (film) => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const response = await this._load({
      url: `movies/${film.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(film)),
      headers,
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  };

  #adaptToServer = (film) => {
    const filmInfo = {
      ...film.filmInfo,
      ['age_rating']: film.filmInfo.ageRating,
      ['alternative_title']: film.filmInfo.alternativeTitle,
      ['total_rating']: film.filmInfo.totalRating,
      release: {
        date: film.filmInfo.release.date,
        ['release_country']: film.filmInfo.release.releaseCountry,
      },
    };

    delete filmInfo.release.releaseCountry;
    delete filmInfo.ageRating;
    delete filmInfo.alternativeTitle;
    delete filmInfo.totalRating;

    const userDetails = {
      ...film.userDetails,
      ['already_watched']: film.userDetails.alreadyWatched,
      ['watching_date']: film.userDetails.watchingDate,
    };

    delete userDetails.alreadyWatched;
    delete userDetails.watchingDate;

    const adaptedFilm = {
      ...film,
      comments: film.commentIds,
      ['film_info']: filmInfo,
      ['user_details']: userDetails,
    };

    delete adaptedFilm.commentIds;
    delete adaptedFilm.filmInfo;
    delete adaptedFilm.userDetails;

    return adaptedFilm;
  };
}
