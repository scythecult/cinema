import { COMMENTS } from '../mock/comments';
import { render } from '../render';
import FilmCommentView from '../view/film-comment-view';
import FilmCommentsContainerView from '../view/film-comments-view';
import FilmDetailsControlsView from '../view/film-details-controls-view';
import FilmDetailsView from '../view/film-details-view';
import NewCommentFormView from '../view/film-new-comment-form-view';
import PopupView from '../view/popup-view';

export default class PopupPresenter {
  getComments(commentIds = []) {
    const currentComments = [];

    for (const commentId of commentIds) {
      for (const comment of COMMENTS) {
        if (commentId === comment.id) {
          currentComments.push(comment);
        }
      }
    }

    return currentComments.map((comment) => new FilmCommentView(comment).getTemplate());
  }

  init(container, filmsModel, filmId = 0) {
    this.filmsModel = filmsModel;
    this.films = [...this.filmsModel.getFilms()];
    this.selectedFilm = this.films.find((film) => film.id === filmId);
    this.filmInfo = this.selectedFilm.filmInfo;
    this.filmCommentIds = this.selectedFilm.comments;
    this.userDetails = this.selectedFilm.userDetails;

    // eslint-disable-next-line no-console
    console.log(this.selectedFilm, filmId);
    this.commentsChildren = {
      comments: this.getComments(this.filmCommentIds),
      newCommentForm: new NewCommentFormView().getTemplate(),
    };
    this.popupChildren = {
      filmDetails: new FilmDetailsView(this.filmInfo).getTemplate(),
      detailsControls: new FilmDetailsControlsView(this.userDetails).getTemplate(),
      commentsContainer: new FilmCommentsContainerView(this.commentsChildren).getTemplate(),
    };

    render(new PopupView(this.popupChildren), container);
  }
}
