import FilmsModel from './model/film-model';
import FilmsPresenter from './presenter/films-presenter';
import ProfilePresenter from './presenter/profile-presenter';
import StatsPresenter from './presenter/stats-presenter';
import CommentsModel from './model/comments-model';
import FilterModel from './model/filter-model';
import FiltersPresenter from './presenter/filter-presenter';

// containers
const profileContainer = document.querySelector('.header');
const mainContainer = document.querySelector('.main');
const footerContainer = document.querySelector('.footer');

// models
const filterModel = new FilterModel();
const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel();

// presenters
const profilePresenter = new ProfilePresenter({ container: profileContainer });
const filterPresenter = new FiltersPresenter({ container: mainContainer, filterModel, filmsModel });
const filmsPresenter = new FilmsPresenter({ container: mainContainer, filmsModel, commentsModel, filterModel });
const statsPresenter = new StatsPresenter({ container: footerContainer });

profilePresenter.init();
filterPresenter.init();
filmsPresenter.init();
statsPresenter.init();
