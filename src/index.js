import FilmsModel from './model/film-model';
import FilmsPresenter from './presenter/films-presenter';
import NavModel from './model/navigarion-model';
import NavigationPresenter from './presenter/navigation-presenter';
import ProfilePresenter from './presenter/profile-presenter';
import StatsPresenter from './presenter/stats-presenter';
import CommentsModel from './model/comments-model';

// containers
const profileContainer = document.querySelector('.header');
const mainContainer = document.querySelector('.main');
const footerContainer = document.querySelector('.footer');

// models
const filmsModel = new FilmsModel();
const navModel = new NavModel();
const commentsModel = new CommentsModel();

// eslint-disable-next-line no-console
console.log(filmsModel.films);
// presenters
const profilePresenter = new ProfilePresenter();
const navigationPresenter = new NavigationPresenter({ navModel });
const filmsPresenter = new FilmsPresenter({ filmsModel, commentsModel });
const statsPresenter = new StatsPresenter();

profilePresenter.init(profileContainer);
navigationPresenter.init(mainContainer);
filmsPresenter.init(mainContainer);
statsPresenter.init(footerContainer);
