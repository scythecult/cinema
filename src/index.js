import FilmsModel from './model/film-model';
import FilmsPresenter from './presenter/films-presenter';
import FiltersModel from './model/filter-model';
import NavModel from './model/navigarion-model';
import NavigationPresenter from './presenter/navigation-presenter';
import ProfilePresenter from './presenter/profile-presenter';
import StatsPresenter from './presenter/stats-presenter';

// containers
const profileContainer = document.querySelector('.header');
const mainContainer = document.querySelector('.main');
const footerContainer = document.querySelector('.footer');

// models
const filmsModel = new FilmsModel();
const navModel = new NavModel();
const filtersModel = new FiltersModel();
// views

// presenters
const profilePresenter = new ProfilePresenter();
const navigationPresenter = new NavigationPresenter(navModel);
const filmsPresenter = new FilmsPresenter(filmsModel, filtersModel);
const statsPresenter = new StatsPresenter();

profilePresenter.init(profileContainer);
navigationPresenter.init(mainContainer);
filmsPresenter.init(mainContainer);
statsPresenter.init(footerContainer);
