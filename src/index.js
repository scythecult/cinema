import FilmsModel from './model/film-model';
import FilmsPresenter from './presenter/films-presenter';
import ProfilePresenter from './presenter/profile-presenter';
import CommentsModel from './model/comments-model';
import FilterModel from './model/filter-model';
import FiltersPresenter from './presenter/filter-presenter';
import FilmApiService from './film-api-service';

const AUTHORIZATION = 'Basic check100500normalno';
const END_POINT = 'https://17.ecmascript.pages.academy/cinemaddict';

// service
const filmApiService = new FilmApiService(END_POINT, AUTHORIZATION);

// containers
const profileContainer = document.querySelector('.header');
const mainContainer = document.querySelector('.main');
const footerContainer = document.querySelector('.footer');

// models
const filterModel = new FilterModel();
const filmsModel = new FilmsModel(filmApiService);
const commentsModel = new CommentsModel(filmApiService);

// presenters
const profilePresenter = new ProfilePresenter({ container: profileContainer });
const filterPresenter = new FiltersPresenter({ container: mainContainer, filterModel, filmsModel });
const filmsPresenter = new FilmsPresenter({
  profileContainer,
  filmContainer: mainContainer,
  footerContainer,
  filmsModel,
  commentsModel,
  filterModel,
});

profilePresenter.init();
filterPresenter.init();
filmsPresenter.init();
filmsModel.init();
